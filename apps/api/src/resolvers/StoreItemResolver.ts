import { MyContext } from './../types';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

import { getStoreItemDetails } from './util/getStoreItemDetails';
import { getSearchResults } from './util/getSearchResults';
import { StorePriceResponse } from './types/listItem';
import { getStorePriceByItem } from './util/storePrices';
import { mapToStorePrices } from './util/mapToStorePrices';
import { getUserFavouriteItemIds } from './util/getUserFavouriteItemIds';

@Resolver()
export class StorePriceResolver {
  @Query(() => [StorePriceResponse])
  async getStoreItems(
    @Arg('offset') offset: number,
    @Arg('limit') limit: number,
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session.userId;
    const data = await getStoreItemDetails(offset, limit, userId);
    return data;
  }

  @Query(() => [StorePriceResponse])
  async searchItems(
    @Arg('searchQuery') searchQuery: string,
    @Arg('limit') limit: number,
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session.userId;
    const data = await getSearchResults(searchQuery, limit, userId);
    return data;
  }

  @Query(() => [StorePriceResponse])
  async getStoreItemsByIds(
    @Arg('itemIds', () => [Number]) itemIds: [number],
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session.userId;
    const userFavouriteItemIds = await getUserFavouriteItemIds(userId);
    const itemDetails = await getStorePriceByItem(itemIds);
    if (!itemDetails) throw Error('Cannot find store prices');
    const storePrices = mapToStorePrices(itemDetails, userFavouriteItemIds);
    return storePrices;
  }
}
