import { StorePrice } from './../../entity/StorePrice';
import { ObjectType, Field } from 'type-graphql';

import { find, includes } from 'lodash';

@ObjectType()
class StorePriceDetails {
  @Field()
  storeId!: number;

  @Field()
  storeName!: string;

  @Field()
  price!: number;

  @Field()
  saving!: number;

  @Field()
  discount!: number;
}

@ObjectType()
export class StorePriceResponse {
  @Field()
  id!: number;

  @Field()
  itemId!: number;

  @Field()
  name!: string;

  @Field()
  category?: string;

  @Field()
  originalPrice!: number;

  @Field()
  img!: string;

  @Field()
  isFavourite!: boolean;

  @Field(() => [StorePriceDetails])
  storePrices!: StorePriceDetails[];
}

export function mapToStorePrices(
  storePrices: StorePrice[],
  userFavouriteItemIds: number[]
) {
  const tmpStorePrices: StorePriceResponse[] = [];

  storePrices.forEach((sp) => {
    const isFavourite = includes(userFavouriteItemIds, sp.item.id);

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
