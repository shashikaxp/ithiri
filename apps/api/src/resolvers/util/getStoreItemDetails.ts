import { getUserFavouriteItemIds } from './getUserFavouriteItemIds';
import { mapToStorePrices } from './mapToStorePrices';
import { StorePriceResponse } from '../types/listItem';
import { getStorePrices } from './storePrices';
import { Week } from '@ithiri/shared-types';

export async function getStoreItemDetails(
  offset: number,
  limit: number,
  userId: number,
  weekType: Week
): Promise<StorePriceResponse[]> {
  const realLimit = Math.min(15, limit);

  const storePrices = await getStorePrices(offset, realLimit, weekType);
  
  const favouriteItemIds = await getUserFavouriteItemIds(userId);
  return mapToStorePrices(storePrices, favouriteItemIds);
}
