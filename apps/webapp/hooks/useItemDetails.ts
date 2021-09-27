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
        price: priceDetails.cwPrice || 0,
        saving: priceDetails.cwSavings || 0,
        discount: priceDetails.cwDiscount || 0,
      });
    } else {
      setItemDetails({
        price: priceDetails.nwPrice || 0,
        saving: priceDetails.nwSavings || 0,
        discount: priceDetails.nwDiscount || 0,
      });
    }
  }, [selectedWeek, priceDetails]);

  return itemDetails;
};
