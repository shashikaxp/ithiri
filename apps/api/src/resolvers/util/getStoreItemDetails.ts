import { getUserFavouriteItemIds } from './getUserFavouriteItemIds';
import { mapToStorePrices } from './mapToStorePrices';
import { StorePriceResponse } from '../types/listItem';
import { getStorePrices } from './storePrices';

export async function getStoreItemDetails(
  offset: number,
  limit: number,
  userId: number
): Promise<StorePriceResponse[]> {
  const realLimit = Math.min(15, limit);

  const storePrices = await getStorePrices(offset, realLimit);

  const favouriteItemIds = await getUserFavouriteItemIds(userId);
  return mapToStorePrices(storePrices, favouriteItemIds);
}
