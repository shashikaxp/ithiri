import { Ctx, Query, Resolver } from 'type-graphql';

import { MyContext } from './../types';
import {
  getStoreItemDetails,
  StorePriceResponse,
} from './util/getStoreItemDetails';

@Resolver()
export class StorePriceResolver {
  @Query(() => [StorePriceResponse])
  async getStoreItems(@Ctx() { em }: MyContext) {
    const data = await getStoreItemDetails(em);
    return data;
  }
}
