import * as stringSimilarity from 'string-similarity';
import { getManager } from 'typeorm';
import { orderBy } from 'lodash';

import { StorePrice } from '../entity/StorePrice';
import { Store } from '../entity/Store';
import { ScrapeItem } from './types/IScraper';
import { Item } from '../entity/Item';

export const saveScrapedItems = async (
  items: ScrapeItem[],
  storeId: number
) => {
  try {
    const em = getManager();
    const store = await em.findOne(Store, { id: storeId });
    const itemsInDB = await em.find(Item, {});

    items.forEach(async (i) => {
      const itemId = getMatchingItemId(itemsInDB, i.name);

      let item: Item | undefined;
      let storePrice: StorePrice | undefined;

      if (itemId) {
        const itemData = await em.findOne(Item, { id: itemId });
        if (itemData) {
          item = itemData;
          storePrice = await em.findOne(StorePrice, {
            item: item,
            store: store,
          });
        }
      } else {
        const itemData = {
          name: i.name,
          description: null,
          image: i.image,
          category: i.category,
          price: i.price,
        };
        item = em.create(Item, itemData);
        await item.save();
      }

      if (storePrice) {
        storePrice.nwPrice = i.currentPrice;
        storePrice.nwSavings = i.savings;
        storePrice.nwDiscount = i.discount;
      } else {
        const storePriceData = {
          item: item,
          store: store,
          cwPrice: undefined,
          cwSavings: undefined,
          cwDiscount: undefined,
          nwPrice: i.currentPrice,
          nwSavings: i.savings,
          nwDiscount: i.discount,
        };
        storePrice = em.create(StorePrice, storePriceData);
      }
      await storePrice.save();
    });
  } catch (error) {
    if (error instanceof Error)
      throw Error('Error ocurred while scraping items' + error.message);
  }
};

// Check similar item is already in the database by comparing the item name
const getMatchingItemId = (itemsInDb: Item[], itemName: string) => {
  const stringMatchingResults = itemsInDb.map((i) => {
    return {
      ...i,
      compatibility: stringSimilarity.compareTwoStrings(i.name, itemName),
    };
  });

  const highestCOmpatibilityItems = stringMatchingResults.filter((i) => {
    return i.compatibility > Number(process.env.COMPATIBILITY_MARGIN);
  });

  const sortedItems = orderBy(
    highestCOmpatibilityItems,
    ['compatibility'],
    ['desc']
  );

  if (sortedItems.length > 0) {
    return sortedItems[0].id;
  } else {
    return null;
  }
};
