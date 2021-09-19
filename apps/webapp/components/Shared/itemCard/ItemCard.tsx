import React from 'react';
import {
  StorePriceResponse,
  useFavouriteMutation,
} from '../../../generated/graphql';
import { PriceTag } from './PriceTag';

import { find } from 'lodash';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useWeekItems } from '../../../hooks/useWeekItems';
import { AddToListButton } from './AddToListButton';
import { ItemCounter } from './ItemCounter';

interface ItemCardProps {
  storePriceResponse: Omit<StorePriceResponse, 'category' | 'originalPrice'>;
  isUserLoggedIn: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  storePriceResponse,
  isUserLoggedIn,
}) => {
  const [favourite] = useFavouriteMutation();
  const { items } = useWeekItems();
  const item = find(items, { itemId: storePriceResponse.itemId });

  const toggleFavourite = (itemId: number) => {
    favourite({
      variables: {
        itemId: itemId,
      },
    });
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
          {item ? (
            <ItemCounter weeklyItem={item} />
          ) : (
            <AddToListButton itemId={storePriceResponse.itemId} />
          )}
        </div>
      )}
    </div>
  );
};
