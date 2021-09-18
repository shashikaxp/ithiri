export * from './lib/shared-types';

export type Week = 'thisWeek' | 'nextWeek';

export interface WeeklyItem {
  itemId: number;
  quantity: number;
}
