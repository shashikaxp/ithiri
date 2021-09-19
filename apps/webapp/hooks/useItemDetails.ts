import { StorePriceResponse } from './../generated/graphql';
import { useEffect, useState } from 'react';
import { useStore } from '../store';

interface Details {
  price: number;
  saving: number;
  discount: number;
}

type Parameter = StorePriceResponse['storePrices'][0];

export const useItemDetails = (priceDetails: Parameter): Details => {
  const selectedWeek = useStore().selectedWeek;
  const [itemDetails, setItemDetails] = useState<Details>({
    price: 0,
    saving: 0,
    discount: 0,
  });

  useEffect(() => {
    if (selectedWeek === 'thisWeek') {
      setItemDetails({
        price: priceDetails.cwPrice,
        saving: priceDetails.cwSavings,
        discount: priceDetails.cwDiscount,
      });
    } else {
      setItemDetails({
        price: priceDetails.nwPrice,
        saving: priceDetails.nwSavings,
        discount: priceDetails.nwDiscount,
      });
    }
  }, [selectedWeek, priceDetails]);

  return itemDetails;
};
