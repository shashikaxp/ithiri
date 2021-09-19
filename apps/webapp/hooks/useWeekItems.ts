import { useStore } from '../store/index';
import type { WeeklyItem } from '@ithiri/shared-types';
import {
  THIS_WEEK_ITEM_COOKIE_NAME,
  NEXT_WEEK_ITEM_COOKIE_NAME,
} from '../constants/index';
import { useCookies } from 'react-cookie';

import { find, filter, cloneDeep } from 'lodash';

interface HookResponse {
  items: WeeklyItem[];
  addQuantity: (itemId: number) => void;
  removeQuantity: (itemId: number) => void;
}

export const useWeekItems = (): HookResponse => {
  const [thisWeekCookies, setThisWeekCookie] = useCookies([
    THIS_WEEK_ITEM_COOKIE_NAME,
  ]);
  const [nextWeekCookies, setNextWeekCookie] = useCookies([
    NEXT_WEEK_ITEM_COOKIE_NAME,
  ]);
  const selectedWeek = useStore().selectedWeek;

  const setCookieData = (items: WeeklyItem[]) => {
    if (selectedWeek === 'thisWeek') {
      setThisWeekCookie(THIS_WEEK_ITEM_COOKIE_NAME, items, {
        path: '/',
      });
    } else {
      setNextWeekCookie(NEXT_WEEK_ITEM_COOKIE_NAME, items, {
        path: '/',
      });
    }
  };

  let items: WeeklyItem[];
  if (selectedWeek === 'thisWeek') {
    items = thisWeekCookies.twi;
  } else {
    items = nextWeekCookies.nwi;
  }

  const clonedItems = cloneDeep(items);

  if (!items) {
    setCookieData([]);
  }

  const addQuantity = (itemId: number) => {
    const item = find(clonedItems, { itemId: itemId });

    if (item) {
      item.quantity = item.quantity + 1;
      setCookieData(clonedItems);
    } else {
      const updatedItems = [
        ...clonedItems,
        {
          itemId,
          quantity: 1,
        },
      ];
      setCookieData(updatedItems);
    }
  };

  const removeQuantity = (itemId: number) => {
    const item = find(clonedItems, { itemId });
    if (item) {
      if (item.quantity === 1) {
        const updatedWeeklyItems = filter(
          clonedItems,
          (wi) => wi.itemId !== itemId
        );
        setCookieData(updatedWeeklyItems);
      } else {
        item.quantity = item.quantity - 1;
        setCookieData(clonedItems);
      }
    }
  };

  return {
    items,
    addQuantity,
    removeQuantity,
  };
};
