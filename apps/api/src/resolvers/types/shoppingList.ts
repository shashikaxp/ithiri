import { WeekScalar } from './../../scalars/Week';
import { ItemDetailsScalar } from './../../scalars/ItemDetails';
import { Field, InputType, ObjectType } from 'type-graphql';
import { ShoppingListType, Week, WeeklyItem } from '@ithiri/shared-types';

@InputType()
class WeeklyItemInput {
  @Field(() => ItemDetailsScalar)
  weeklyItems!: WeeklyItem[];

  @Field(() => WeekScalar)
  week!: Week;
}

@ObjectType()
class ShoppingListResponse {
  @Field(() => [ShoppingList])
  shoppingLists?: ShoppingList[];
}

@ObjectType()
class ShoppingList {
  @Field(() => String)
  type!: ShoppingListType;

  @Field()
  totalSavings!: number;

  @Field(() => [ShoppingItem])
  storeItems!: ShoppingItem[];
}

@ObjectType()
class ShoppingItem {
  @Field(() => Number, { nullable: true })
  storeId!: number | null;

  @Field()
  name!: string;

  @Field()
  image!: string;

  @Field(() => Number, { nullable: true })
  originalPrice!: number | null;

  @Field(() => Number, { nullable: true })
  price!: number | null;

  @Field(() => Number, { nullable: true })
  quantity!: number | null;

  @Field(() => Number, { nullable: true })
  saving!: number | null;

  @Field(() => Number, { nullable: true })
  discount!: number | null;

  @Field(() => Number, { nullable: true })
  total!: number | null;
}

export { WeeklyItemInput, ShoppingListResponse, ShoppingList, ShoppingItem };
