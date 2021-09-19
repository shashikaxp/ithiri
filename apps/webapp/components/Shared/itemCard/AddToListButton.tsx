import React from 'react';
import { useThisWeekItems } from './../../../hooks/useThisWeekItems';

interface AddToListButtonProps {
  itemId: number;
}

export const AddToListButton: React.FC<AddToListButtonProps> = ({ itemId }) => {
  const { addQuantity } = useThisWeekItems();

  return (
    <button
      className={'w-full p-1 rounded-br-xl rounded-bl-xl bg-primary text-white'}
      onClick={() => {
        addQuantity(itemId);
      }}
    >
      Add to list
    </button>
  );
};
