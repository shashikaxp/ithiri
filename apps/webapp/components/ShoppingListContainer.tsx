import React from 'react';
import {
  ShoppingItem,
  ShoppingList as ShoppingListType,
} from '../generated/graphql';
import { ShoppingList } from './ShoppingList';

import { filter } from 'lodash';

interface ShoppingListContainerProps {
  shoppingListDetails: ShoppingListType | undefined;
}

export const ShoppingListContainer: React.FC<ShoppingListContainerProps> = ({
  shoppingListDetails,
}) => {
  let title = '';

  let colesWeeklyList: ShoppingItem[] = [];
  let wooliesWeeklyList: ShoppingItem[] = [];

  switch (shoppingListDetails?.type) {
    case 'best-value':
      title = '2 Trips (Coles + Woolworths)';
      colesWeeklyList = filter(
        shoppingListDetails.storeItems,
        (si) => si.storeId === 1
      );
      wooliesWeeklyList = filter(
        shoppingListDetails.storeItems,
        (si) => si.storeId === 2
      );
      break;
    case 'coles':
      title = '1 Trip (Coles)';
      break;
    case 'woolworths':
      title = '1 Trip ( Woolworths)';
      break;
    default:
      break;
  }

  return (
    <div className="p-4 bg-white m-4">
      <div className="flex justify-between px-4 text-xl font-bold">
        <div>{title}</div>
        <div>Save {shoppingListDetails?.totalSavings}</div>
      </div>

      {shoppingListDetails?.type === 'best-value'
        ? shoppingListDetails && (
            <div>
              <div className="px-4 mt-4 text-base font-bold">
                Coles Shopping List
              </div>
              <ShoppingList listItems={colesWeeklyList} />
              <div className="px-4 mt-4 text-base font-bold">
                Woolworths Shopping List
              </div>
              <ShoppingList listItems={wooliesWeeklyList} />
            </div>
          )
        : shoppingListDetails && (
            <ShoppingList listItems={shoppingListDetails.storeItems} />
          )}
    </div>
  );
};
