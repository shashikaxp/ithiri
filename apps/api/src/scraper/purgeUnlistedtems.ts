import { StorePrice } from './../entity/StorePrice';
import { getConnection } from 'typeorm';

import { forIn, groupBy } from 'lodash';

export interface ItemDetails {
  storePrice_id: number;
  storePrice_cwPrice: string;
  storePrice_cwSavings: string;
  storePrice_cwDiscount: string;
  storePrice_nwPrice: null;
  storePrice_nwSavings: null;
  storePrice_nwDiscount: null;
  storePrice_createdAt: string;
  storePrice_updatedAt: string;
  storePrice_itemId: number;
  storePrice_storeId: number;
  store_id: number;
  store_name: string;
  store_createdAt: string;
  store_updatedAt: string;
  item_id: number;
  item_storeId: number;
  item_name: string;
  item_image: string;
  item_category: null;
  item_price: string;
  item_createdAt: string;
  item_updatedAt: string;
}

export const purgeItems = async () => {
  const data = await getConnection()
    .getRepository(StorePrice)
    .createQueryBuilder('storePrice')
    .orderBy('storePrice.id', 'ASC')
    .leftJoinAndSelect('storePrice.store', 'store')
    .leftJoinAndSelect('storePrice.item', 'item')
    .where('item.storeId = 2')
    .execute();

  const groupedData = groupBy(data, 'item_id');
  getUnlistedItemIds(groupedData);
  return groupedData;
};

const getUnlistedItemIds = (data: Record<string, ItemDetails[]>) => {
  const ids: string[] = [];
  forIn(data, (value, i) => {
    let haveValidData = false;
    value.forEach((v) => {
      if (v.storePrice_cwPrice || v.storePrice_nwPrice) {
        haveValidData = true;
      }
    });

    if (!haveValidData) {
      ids.push(i);
    }
  });
  console.log(ids);
};
