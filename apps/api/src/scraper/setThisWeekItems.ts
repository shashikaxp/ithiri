import { getConnection } from 'typeorm';
import { StorePrice } from '../entity/StorePrice';

export const setThisWeekItems = async (): Promise<boolean> => {
  try {
    const qb = await getConnection()
      .getRepository(StorePrice)
      .createQueryBuilder('storePrice');

    const storePriceItems = await qb.where({}).getMany();

    for (let i = 0; i < storePriceItems.length; i++) {
      const storeItem = storePriceItems[i];
      await qb
        .update()
        .set({
          cwDiscount: storeItem.nwDiscount,
          cwPrice: storeItem.nwPrice,
          cwSavings: storeItem.nwSavings,
          nwDiscount: null,
          nwPrice: null,
          nwSavings: null,
        })
        .where({ id: storeItem.id })
        .execute();
    }

    return true;
  } catch (error) {
    if (error instanceof Error)
      throw Error(
        `Error ocurred while setting this week items ${error.message}`
      );

    throw Error(`Error ocurred while setting this week items`);
  }
};
