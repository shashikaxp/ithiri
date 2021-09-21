import { StorePrice } from './../../entity/StorePrice';

import { find, includes } from 'lodash';
import { StorePriceResponse } from '../types/listItem';

export function mapToStorePrices(
  storePrices: StorePrice[],
  userFavouriteItemIds: number[]
) {
  const tmpStorePrices: StorePriceResponse[] = [];

  storePrices.forEach((sp) => {
    const isFavourite = includes(userFavouriteItemIds, sp.item.id);

    const storePrice = find(tmpStorePrices, { itemId: sp.item.id });
    if (storePrice) {
      storePrice.storePrices.push({
        storeId: sp.store.id,
        storeName: sp.store.name,
        cwPrice: sp.cwPrice,
        cwSavings: sp.cwSavings,
        cwDiscount: sp.cwDiscount,
        nwPrice: sp.nwPrice,
        nwSavings: sp.nwSavings,
        nwDiscount: sp.nwDiscount,
      });
    } else {
      tmpStorePrices.push({
        id: sp.id,
        itemId: sp.item.id,
        name: sp.item.name,
        category: sp.item.category,
        originalPrice: sp.item.price,
        img: sp.item.image,
        isFavourite: isFavourite,
        storePrices: [
          {
            storeId: sp.store.id,
            storeName: sp.store.name,
            cwPrice: sp.cwPrice,
            cwSavings: sp.cwSavings,
            cwDiscount: sp.cwDiscount,
            nwPrice: sp.nwPrice,
            nwSavings: sp.nwSavings,
            nwDiscount: sp.nwDiscount,
          },
        ],
      });
    }
  });

  return tmpStorePrices;
}
