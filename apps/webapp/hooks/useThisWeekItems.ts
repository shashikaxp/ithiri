import { THIS_WEEK_ITEM_COOKIE_NAME } from './../constants/index';
import { useCookies } from 'react-cookie';

import { includes, pull } from 'lodash';

interface HookResponse {
  items: number[];
  setItems: (itemId: number) => void;
}

export const useThisWeekItems = (): HookResponse => {
  const [cookies, setCookie] = useCookies([THIS_WEEK_ITEM_COOKIE_NAME]);
  const items = cookies.twi ? cookies.twi : [];

  if (!cookies.twi) {
    setCookie(THIS_WEEK_ITEM_COOKIE_NAME, [], { path: '/' });
  }
  const setItems = (itemId: number) => {
    const isExist = includes(cookies.twi, itemId);
    if (isExist) {
      const updatedItems = pull(cookies.twi, itemId);
      setCookie(THIS_WEEK_ITEM_COOKIE_NAME, updatedItems, { path: '/' });
    } else {
      const updatedItems = [...cookies.twi, itemId];
      setCookie(THIS_WEEK_ITEM_COOKIE_NAME, updatedItems, { path: '/' });
    }
  };

  return {
    items: items,
    setItems: setItems,
  };
};
