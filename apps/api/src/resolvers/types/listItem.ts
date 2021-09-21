import { Field, ObjectType } from 'type-graphql';

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
class StorePriceResponse {
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

export { StorePriceDetails, StorePriceResponse };
