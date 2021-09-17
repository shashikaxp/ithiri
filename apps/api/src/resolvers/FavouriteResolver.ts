import { getConnection } from 'typeorm';
import { StorePrice } from './../entity/StorePrice';

import { User } from './../entity/User';
import { Item } from './../entity/Item';
import { MyContext } from './../types';
import { Favourite } from './../entity/Favourite';
import { Resolver, Arg, Ctx, Mutation, Query } from 'type-graphql';
import { mapToStorePrices, StorePriceResponse } from './util/mapToStorePrices';
import { getUserFavouriteItemIds } from './util/getUserFavouriteItemIds';

@Resolver()
export class FavouriteResolver {
  @Query(() => [StorePriceResponse])
  async getFavourites(@Ctx() { req }: MyContext) {
    const userId = req.session.userId;

    const favouriteItemIds = await getUserFavouriteItemIds(userId);

    if (favouriteItemIds.length === 0) {
      return [];
    }

    const storePrices = await getConnection()
      .getRepository(StorePrice)
      .createQueryBuilder('storePrice')
      .leftJoinAndSelect('storePrice.item', 'item')
      .leftJoinAndSelect('storePrice.store', 'store')
      .where('storePrice.itemId IN (:...itemIds)', {
        itemIds: favouriteItemIds,
      })
      .getMany();

    return mapToStorePrices(storePrices, favouriteItemIds);
  }

  @Mutation(() => StorePriceResponse)
  async favourite(
    @Arg('itemId') itemId: number,
    @Ctx() { em, req }: MyContext
  ): Promise<StorePriceResponse> {
    const item = await em.findOne(Item, { id: itemId });
    const userId = req.session.userId;

    if (!item) throw Error('Invalid item');
    if (!userId) throw Error('User not found');

    const favouriteItem = await em.findOne(Favourite, { item: item });
    const storePrice = await getConnection()
      .getRepository(StorePrice)
      .createQueryBuilder('storePrice')
      .leftJoinAndSelect('storePrice.item', 'item')
      .leftJoinAndSelect('storePrice.store', 'store')
      .where('storePrice.itemId = :id', { id: itemId })
      .getOne();

    let storeResponsePrice: StorePriceResponse;
    if (storePrice) {
      storeResponsePrice = mapToStorePrices([storePrice], [])[0];
      if (favouriteItem) {
        await em.delete(Favourite, { id: favouriteItem.id });
        storeResponsePrice.isFavourite = false;
        return storeResponsePrice;
      } else {
        const user = await em.findOne(User, { id: userId });
        const newFavouriteItem = await em.create(Favourite, {
          user: user,
          item: item,
        });
        await newFavouriteItem.save();
        storeResponsePrice.isFavourite = true;
        return storeResponsePrice;
      }
    } else {
      throw Error('Cannot find store price');
    }
  }
}
