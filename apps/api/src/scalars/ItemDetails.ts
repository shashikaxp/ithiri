import { GraphQLScalarType } from 'graphql';

import { isArray } from 'lodash';

export const ItemDetailsScalar = new GraphQLScalarType({
  name: 'ItemDetails',
  description: 'Weekly item details',
  serialize(value) {
    return value;
  },
  parseValue<WeeklyItem>(value: WeeklyItem[]) {
    if (!isArray) {
      throw Error('Item details should be an array');
    }
    return value;
  },
});
