import { StorePriceResponse } from './util/mapToStorePrices';
import { Arg, Query, Resolver } from 'type-graphql';

import { getStoreItemDetails } from './util/getStoreItemDetails';
import { getSearchResults } from './util/getSearchResults';

@Resolver()
export class StorePriceResolver {
  @Query(() => [StorePriceResponse])
  async getStoreItems(
    @Arg('offset') offset: number,
    @Arg('limit') limit: number
  ) {
    const data = await getStoreItemDetails(offset, limit);
    return data;
  }

  @Query(() => [StorePriceResponse])
  async searchItems(
    @Arg('searchQuery') searchQuery: string,
    @Arg('limit') limit: number
  ) {
    const data = await getSearchResults(searchQuery, limit);
    return data;
  }
}
