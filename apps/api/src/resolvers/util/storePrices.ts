import { getConnection } from 'typeorm';
import { StorePrice } from './../../entity/StorePrice';

const getStoreItemQuery = async () => {
  const query = await getConnection()
    .getRepository(StorePrice)
    .createQueryBuilder('storePrice')
    .orderBy('storePrice.id', 'ASC')
    .leftJoinAndSelect('storePrice.store', 'store')
    .leftJoinAndSelect('storePrice.item', 'item');
  return query;
};

async function getStorePriceByItem(
  itemId: number
): Promise<StorePrice | undefined>;
function getStorePriceByItem(
  itemIds: number[]
): Promise<StorePrice[] | undefined>;
async function getStorePriceByItem(
  arg1: unknown
): Promise<StorePrice | StorePrice[] | undefined> {
  const query = await getStoreItemQuery();

  if (typeof arg1 === 'number') {
    const result = await query
      .where('storePrice.itemId = :id', { id: arg1 })
      .getOne();
    return result;
  } else if (typeof arg1 === 'object') {
    const result = await query
      .where('storePrice.itemId IN (:...itemIds)', {
        itemIds: arg1,
      })
      .getMany();
    return result;
  } else {
    throw Error('invalid Arguments');
  }
}

async function getStorePriceByItemName(name: string, limit: number) {
  const query = await getStoreItemQuery();
  const storePrices = query
    .where('item.name ILIKE :searchQuery', { searchQuery: `%${name}%` })
    .limit(limit)
    .getMany();

  return storePrices;
}

async function getStorePrices(offset: number, limit: number) {
  const query = await getStoreItemQuery();
  const storePrices = query.skip(offset).take(limit).getMany();

  return storePrices;
}

export { getStorePriceByItem, getStorePriceByItemName, getStorePrices };
