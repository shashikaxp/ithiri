import React from 'react';
import { WeeklyItem } from './../../../types';

import { useThisWeekItems } from './../../../hooks/useThisWeekItems';

interface ItemCounterProps {
  weeklyItem: WeeklyItem;
}

export const ItemCounter: React.FC<ItemCounterProps> = ({ weeklyItem }) => {
  const { addQuantity, removeQuantity } = useThisWeekItems();
  return (
    <div className="w-full select-none rounded-br-xl rounded-bl-xl bg-primary-light text-white flex justify-between align-middle">
      <div
        className="  rounded-bl-xl py-1 px-4 bg-primary cursor-pointer"
        onClick={() => removeQuantity(weeklyItem.itemId)}
      >
        -
      </div>
      <div className="flex justify-center flex-col text-text font-bold">
        <div> {weeklyItem.quantity}</div>
      </div>
      <div
        className=" rounded-br-xl py-1 px-4 bg-primary cursor-pointer"
        onClick={() => addQuantity(weeklyItem.itemId)}
      >
        +
      </div>
    </div>
  );
};
