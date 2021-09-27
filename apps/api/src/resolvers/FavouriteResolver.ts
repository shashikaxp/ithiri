import {
  Resolver,
  Arg,
  Ctx,
  Mutation,
  Query,
  UseMiddleware,
} from 'type-graphql';

import { User } from './../entity/User';
import { Item } from './../entity/Item';
import { MyContext } from './../types';
import { Favourite } from './../entity/Favourite';
import { mapToStorePrices } from './util/mapToStorePrices';
import { getUserFavouriteItemIds } from './util/getUserFavouriteItemIds';
import { getStorePriceByItem } from './util/storePrices';
import { StorePriceResponse } from './types/listItem';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class FavouriteResolver {
  @Query(() => [StorePriceResponse])
  @UseMiddleware(isAuth)
  async getFavourites(@Ctx() { req }: MyContext) {
    const userId = req.session.userId;
    const favouriteItemIds = await getUserFavouriteItemIds(userId);
    if (favouriteItemIds.length === 0) {
      return [];
    }
    const storePrices = await getStorePriceByItem(favouriteItemIds);
    if (!storePrices) throw Error('Can not find store prices');
    return mapToStorePrices(storePrices, favouriteItemIds);
  }

  @Mutation(() => StorePriceResponse)
  @UseMiddleware(isAuth)
  async favourite(
    @Arg('itemId') itemId: number,
    @Ctx() { em, req }: MyContext
  ): Promise<StorePriceResponse> {
    const item = await em.findOne(Item, { id: itemId });
    const userId = req.session.userId;

    if (!item) throw Error('Invalid item');
    if (!userId) throw Error('User not found');

    const favouriteItem = await em.findOne(Favourite, { item: item });
    const storePrice = await getStorePriceByItem(itemId);

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
