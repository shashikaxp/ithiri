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

  @Mutation(() => Boolean)
  async favourite(
    @Arg('itemId') itemId: number,
    @Ctx() { em, req }: MyContext
  ) {
    const item = await em.findOne(Item, { id: itemId });

    if (!item) {
      return false;
    }
    const favouriteItem = await em.findOne(Favourite, { item: item });

    if (favouriteItem) {
      await em.delete(Favourite, { id: favouriteItem.id });
      return true;
    } else {
      const userId = req.session.userId;
      if (!userId) return false;
      const user = await em.findOne(User, { id: userId });
      const newFavouriteItem = await em.create(Favourite, {
        user: user,
        item: item,
      });
      await newFavouriteItem.save();
      return true;
    }
  }
}
