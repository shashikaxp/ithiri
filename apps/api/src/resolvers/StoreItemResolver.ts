import { Arg, Query, Resolver } from 'type-graphql';

import {
  getStoreItemDetails,
  StorePriceResponse,
} from './util/getStoreItemDetails';

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
}
