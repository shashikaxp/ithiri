import { WeeklyItem } from './../types/index';
import { THIS_WEEK_ITEM_COOKIE_NAME } from './../constants/index';
import { useCookies } from 'react-cookie';

import { find, filter, cloneDeep } from 'lodash';

interface HookResponse {
  items: WeeklyItem[];
  addQuantity: (itemId: number) => void;
  removeQuantity: (itemId: number) => void;
}

export const useThisWeekItems = (): HookResponse => {
  const [cookies, setCookie] = useCookies([THIS_WEEK_ITEM_COOKIE_NAME]);
  const items = cookies.twi ? cookies.twi : [];
  const clonedItems = cloneDeep(items);

  if (!cookies.twi) {
    setCookie(THIS_WEEK_ITEM_COOKIE_NAME, [], { path: '/' });
  }

  const addQuantity = (itemId: number) => {
    const item: WeeklyItem = find(clonedItems, { itemId: itemId });

    if (item) {
      item.quantity = item.quantity + 1;
      setCookie(THIS_WEEK_ITEM_COOKIE_NAME, clonedItems, { path: '/' });
    } else {
      const updatedItems = [
        ...clonedItems,
        {
          itemId,
          quantity: 1,
        },
      ];
      setCookie(THIS_WEEK_ITEM_COOKIE_NAME, updatedItems, { path: '/' });
    }
  };

  const removeQuantity = (itemId: number) => {
    const item: WeeklyItem = find(clonedItems, { itemId });
    if (item) {
      if (item.quantity === 1) {
        const updatedWeeklyItems = filter(
          clonedItems,
          (wi) => wi.itemId !== itemId
        );
        console.log('asd', updatedWeeklyItems);
        setCookie(THIS_WEEK_ITEM_COOKIE_NAME, updatedWeeklyItems, {
          path: '/',
        });
      } else {
        item.quantity = item.quantity - 1;
        setCookie(THIS_WEEK_ITEM_COOKIE_NAME, clonedItems, { path: '/' });
      }
    }
  };

  return {
    items,
    addQuantity,
    removeQuantity,
  };
};
