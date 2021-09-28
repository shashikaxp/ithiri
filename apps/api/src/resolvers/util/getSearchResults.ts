import { mapToStorePrices } from './mapToStorePrices';
import { getUserFavouriteItemIds } from './getUserFavouriteItemIds';
import { getStorePriceByItemName } from './storePrices';
import { StorePriceResponse } from '../types/listItem';
import { Week } from '@ithiri/shared-types';

export async function getSearchResults(
  searchQuery: string,
  limit: number,
  userId: number,
  weekType: Week
): Promise<StorePriceResponse[]> {
  const realLimit = Math.min(15, limit);

  const storePrices = await getStorePriceByItemName(
    searchQuery,
    realLimit,
    weekType
  );

  const favouriteItemIds = await getUserFavouriteItemIds(userId);
  return mapToStorePrices(storePrices, favouriteItemIds);
}
