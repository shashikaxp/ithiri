import React from 'react';
import { ShoppingItem } from '../generated/graphql';

interface ShoppingListProps {
  listItems: ShoppingItem[];
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  listItems = [],
}) => {
  return (
    <div>
      {listItems.length === 0 ? (
        <div className="p-4 text-gray-400">No items were found</div>
      ) : (
        <div>
          <div className="grid grid-cols-shopping-list p-4">
            <div className="p-3 bg-primary-light text-text mb-2">Item Name</div>
            <div className="p-3 bg-primary-light text-text text-center mb-2">
              Price
            </div>
            <div className="p-3 bg-primary-light text-text text-center mb-2">
              Discounted Price
            </div>
            <div className="p-3 bg-primary-light text-text text-center mb-2">
              Quantity
            </div>
            <div className="p-3 bg-primary-light text-text text-right mb-2">
              Total
            </div>
            {listItems.map((li) => {
              return (
                <React.Fragment key={li.name}>
                  <div className="px-3 py-1">{li.name}</div>
                  <div className="text-center">{li.originalPrice}</div>
                  <div className="text-center">{li.price}</div>
                  <div className="text-center">{li.quantity}</div>
                  <div className="text-right px-3">{li.total}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
