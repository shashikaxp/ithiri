import { MyContext } from './../types';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

import { getStoreItemDetails } from './util/getStoreItemDetails';
import { getSearchResults } from './util/getSearchResults';
import { StorePriceResponse } from './types/listItem';

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
}
