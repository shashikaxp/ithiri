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
  cwPrice!: number;

  @Field()
  cwSavings!: number;

  @Field()
  cwDiscount!: number;

  @Field()
  nwPrice!: number;

  @Field()
  nwSavings!: number;

  @Field()
  nwDiscount!: number;
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
