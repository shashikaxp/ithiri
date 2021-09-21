import { Week } from './../../../../libs/shared-types/src/index';
import { GraphQLScalarType } from 'graphql';

export const WeekScalar = new GraphQLScalarType({
  name: 'WeekType',
  description: 'Week type',
  serialize(value) {
    return value;
  },
  parseValue(value: Week) {
    if (value !== 'nextWeek' && value !== 'thisWeek') {
      throw Error('Invalid Week input');
    }
    return value;
  },
});
