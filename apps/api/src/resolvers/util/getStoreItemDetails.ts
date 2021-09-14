import { ObjectType, Field } from 'type-graphql';
import { EntityManager } from 'typeorm';

import { find } from 'lodash';

import { StorePrice } from '../../entity/StorePrice';

@ObjectType()
class StorePriceDetails {
  @Field()
  storeId: number;

  @Field()
  storeName: string;

  @Field()
  price: number;

  @Field()
  saving: number;

  @Field()
  discount: number;
}

@ObjectType()
export class StorePriceResponse {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  originalPrice: number;

  @Field()
  img: string;

  @Field(() => [StorePriceDetails])
  storePrices: StorePriceDetails[];
}

export async function getStoreItemDetails(
  em: EntityManager
): Promise<StorePriceResponse[]> {
  const tmpStorePrices: StorePriceResponse[] = [];

  const storePrices = await em.find(StorePrice, {
    relations: ['item', 'store'],
  });

  storePrices.forEach((sp) => {
    const storePrice = find(tmpStorePrices, { id: sp.id });
    if (storePrice instanceof StorePriceResponse) {
      storePrice.storePrices.push({
        storeId: sp.store.id,
        storeName: sp.store.name,
        price: sp.cwPrice,
        saving: sp.cwSavings,
        discount: sp.cwDiscount,
      });
    } else {
      tmpStorePrices.push({
        name: sp.item.name,
        category: sp.item.category,
        originalPrice: sp.item.price,
        img: sp.item.image,
        storePrices: [
          {
            storeId: sp.store.id,
            storeName: sp.store.name,
            price: sp.cwPrice,
            saving: sp.cwSavings,
            discount: sp.cwDiscount,
          },
        ],
      });
    }
  });

  return tmpStorePrices;
}
