import React, { useState } from 'react';
import {
  namedOperations,
  StorePriceResponse,
  useFavouriteMutation,
} from '../generated/graphql';
import { PriceTag } from './PriceTag';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useThisWeekItems } from '../hooks/useThisWeekItems';

interface ItemCardProps {
  storePriceResponse: Omit<StorePriceResponse, 'category' | 'originalPrice'>;
  isUserLoggedIn: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  storePriceResponse,
  isUserLoggedIn,
}) => {
  const [favourite] = useFavouriteMutation({
    refetchQueries: [
      namedOperations.Query.GetStoreItems,
      namedOperations.Query.GetSearchItems,
    ],
  });

  const { items, setItems } = useThisWeekItems();

  const toggleFavourite = (itemId: number) => {
    favourite({
      variables: {
        itemId: itemId,
      },
    });
  };

  const isAlreadyInThisWeekItems = (itemId: number) => {
    return items.includes(itemId);
  };

  const getActionButtonClasses = (itemId: number) => {
    const commonClasses = 'w-full p-1 rounded-br-xl rounded-bl-xl';
    if (isAlreadyInThisWeekItems(itemId)) {
      return `${commonClasses} bg-primary-light text-red-600`;
    } else {
      return `${commonClasses} bg-primary text-white`;
    }
  };

  return (
    <div className="bg-white flex flex-col rounded-xl">
      {isUserLoggedIn && (
        <div className="p-2 flex justify-end">
          {storePriceResponse.isFavourite ? (
            <AiFillHeart
              onClick={() => toggleFavourite(storePriceResponse.itemId)}
              className="text-xl text-red-500 cursor-pointer"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => toggleFavourite(storePriceResponse.itemId)}
              className="text-xl text-red-500 cursor-pointer"
            />
          )}
        </div>
      )}
      <div className="h-40 p-4 flex justify-center ">
        <img
          className="h-full w-auto "
          src={storePriceResponse.img}
          alt={storePriceResponse.name}
        />
      </div>
      <div className="p-4">
        <div className="h-32 text-lg">{storePriceResponse.name}</div>
        {storePriceResponse.storePrices.map((sp) => {
          return (
            <PriceTag
              key={sp.storeId + storePriceResponse.id}
              storePrices={sp}
            />
          );
        })}
      </div>
      {isUserLoggedIn && (
        <div>
          <button
            className={`${getActionButtonClasses(storePriceResponse.id)}`}
            onClick={() => {
              setItems(storePriceResponse.id);
            }}
          >
            {isAlreadyInThisWeekItems(storePriceResponse.id)
              ? 'Remove from list'
              : 'Add to list'}
          </button>
        </div>
      )}
    </div>
  );
};
