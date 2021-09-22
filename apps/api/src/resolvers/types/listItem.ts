import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class StorePriceDetails {
  @Field()
  storeId!: number;

  @Field()
  storeName!: string;

  @Field(() => Number, { nullable: true })
  cwPrice!: number | null;

  @Field(() => Number, { nullable: true })
  cwSavings!: number | null;

  @Field(() => Number, { nullable: true })
  cwDiscount!: number | null;

  @Field(() => Number, { nullable: true })
  nwPrice!: number | null;

  @Field(() => Number, { nullable: true })
  nwSavings!: number | null;

  @Field(() => Number, { nullable: true })
  nwDiscount!: number | null;
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
