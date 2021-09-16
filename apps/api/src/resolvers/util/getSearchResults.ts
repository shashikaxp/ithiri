import { getConnection } from 'typeorm';

import { StorePrice } from '../../entity/StorePrice';
import { mapToStorePrices, StorePriceResponse } from './mapToStorePrices';
import { getUserFavouriteItemIds } from './getUserFavouriteItemIds';

export async function getSearchResults(
  searchQuery: string,
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
    .where('item.name ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
    .limit(realLimit)
    .getMany();

  const favouriteItemIds = await getUserFavouriteItemIds(userId);
  return mapToStorePrices(storePrices, favouriteItemIds);
}
