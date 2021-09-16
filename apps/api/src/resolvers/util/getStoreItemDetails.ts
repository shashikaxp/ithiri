import { getConnection } from 'typeorm';

import { StorePrice } from '../../entity/StorePrice';
import { getUserFavouriteItemIds } from './getUserFavouriteItemIds';
import { mapToStorePrices, StorePriceResponse } from './mapToStorePrices';

export async function getStoreItemDetails(
  offset: number,
  limit: number,
  userId: number
): Promise<StorePriceResponse[]> {
  const realLimit = Math.min(15, limit);

  const storePrices = await getConnection()
    .getRepository(StorePrice)
    .createQueryBuilder('storePrice')
    .orderBy('storePrice.id', 'ASC')
    .leftJoinAndSelect('storePrice.store', 'store')
    .leftJoinAndSelect('storePrice.item', 'item')
    .skip(offset)
    .take(realLimit)
    .getMany();

  const favouriteItemIds = await getUserFavouriteItemIds(userId);
  return mapToStorePrices(storePrices, favouriteItemIds);
}
