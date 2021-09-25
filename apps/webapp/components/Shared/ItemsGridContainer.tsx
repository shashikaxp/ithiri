import React from 'react';
import { StorePriceResponse } from '../../generated/graphql';
import { ItemCard } from './itemCard/ItemCard';

interface ItemsGridContainerProps {
  storeItems: Omit<StorePriceResponse, 'category' | 'originalPrice'>[];
  isUserLoggedIn: boolean;
}

export const ItemsGridContainer: React.FC<ItemsGridContainerProps> = ({
  storeItems,
  isUserLoggedIn,
}) => {
  return (
    <div className="p-6 grid gap-3 md:grid-cols-auto">
      {storeItems.map((item) => {
        return (
          <ItemCard
            key={item.id}
            isUserLoggedIn={isUserLoggedIn}
            storePriceResponse={item}
          />
        );
      })}
    </div>
  );
};
