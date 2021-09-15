import React from 'react';
import { StorePriceResponse } from '../generated/graphql';

interface PriceTagProps {
  storePrices: StorePriceResponse['storePrices'][0];
}

export const PriceTag: React.FC<PriceTagProps> = ({ storePrices }) => {
  let storeColor;

  if (storePrices.storeName.includes('coles')) {
    storeColor = 'red';
  } else {
    storeColor = 'green';
  }

  return (
    <div className={`bg-${storeColor}-light flex rounded-md`}>
      <div
        className={`w-20 bg-${storeColor} text-white rounded-tl-md rounded-bl-md p-2 text-center`}
      >
        <div className="text-sm font-bold">{storePrices.storeName}</div>
        <div className="text-base font-bold">{storePrices.discount}%</div>
      </div>
      <div className="flex flex-col justify-center text-sm flex-grow p-2">
        <div className="flex justify-between">
          <div>Price</div>
          <div>{storePrices.price}</div>
        </div>
        <div className="flex justify-between">
          <div>Discount</div>
          <div>{storePrices.discount}</div>
        </div>
      </div>
    </div>
  );
};
