import { mapToStorePrices } from './mapToStorePrices';
import { getUserFavouriteItemIds } from './getUserFavouriteItemIds';
import { getStorePriceByItemName } from './storePrices';
import { StorePriceResponse } from '../types/listItem';

export async function getSearchResults(
  searchQuery: string,
  limit: number,
  userId: number
): Promise<StorePriceResponse[]> {
  const realLimit = Math.min(15, limit);

  const storePrices = await getStorePriceByItemName(searchQuery, realLimit);

  const favouriteItemIds = await getUserFavouriteItemIds(userId);
  return mapToStorePrices(storePrices, favouriteItemIds);
}
