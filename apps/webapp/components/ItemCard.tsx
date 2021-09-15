import React from 'react';
import { StorePriceResponse } from '../generated/graphql';
import { PriceTag } from './PriceTag';

interface ItemCardProps {
  storePriceResponse: Omit<StorePriceResponse, 'category' | 'originalPrice'>;
}

export const ItemCard: React.FC<ItemCardProps> = ({ storePriceResponse }) => {
  return (
    <div className="bg-white flex flex-col rounded-xl">
      <div className="h-40 p-4 flex justify-center ">
        <img
          className="h-full w-auto "
          src={storePriceResponse.img}
          alt={storePriceResponse.name}
        />
      </div>
      <div className="p-4">
        <div className="h-24 text-xl">{storePriceResponse.name}</div>
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
