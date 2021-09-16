import React from 'react';
import {
  namedOperations,
  StorePriceResponse,
  useFavouriteMutation,
} from '../generated/graphql';
import { PriceTag } from './PriceTag';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

interface ItemCardProps {
  storePriceResponse: Omit<StorePriceResponse, 'category' | 'originalPrice'>;
}

export const ItemCard: React.FC<ItemCardProps> = ({ storePriceResponse }) => {
  const [favourite] = useFavouriteMutation({
    refetchQueries: [
      namedOperations.Query.GetStoreItems,
      namedOperations.Query.GetSearchItems,
    ],
  });

  const toggleFavourite = (itemId: number) => {
    favourite({
      variables: {
        itemId: itemId,
      },
    });
  };

  return (
    <div className="bg-white flex flex-col rounded-xl">
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
    </div>
  );
};
