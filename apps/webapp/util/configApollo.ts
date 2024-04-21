import { InMemoryCache, ApolloClient } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (!amount) return 'N/A';
  return formatter.format(amount);
};

const formatDiscount = (discount: number) => {
  if (!discount) return 'N/A';
  if (discount % 1 === 0.0) {
    return `${Math.floor(discount).toString()}%`;
  } else {
    return `*${Math.floor(discount).toString()}%`;
  }
};

export const getApollo = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getStoreItems: offsetLimitPagination(),
          },
        },
        StorePriceDetails: {
          fields: {
            cwPrice: {
              read(price) {
                return formatCurrency(price);
              },
            },
            nwPrice: {
              read(price) {
                return formatCurrency(price);
              },
            },
            cwSavings: {
              read(saving) {
                return formatCurrency(saving);
              },
            },
            nwSavings: {
              read(saving) {
                return formatCurrency(saving);
              },
            },
            cwDiscount: {
              read(discount) {
                return formatDiscount(discount);
              },
            },
            nwDiscount: {
              read(discount) {
                return formatDiscount(discount);
              },
            },
          },
        },
        ShoppingList: {
          fields: {
            totalSavings: {
              read(price) {
                if (price == 0) {
                  return price;
                } 
                return formatCurrency(price);
              },
            },
            totalCost: {
              read(price) {
                return formatCurrency(price);
              },
            },
          },
        },
        ShoppingItem: {
          fields: {
            originalPrice: {
              read(price) {
                return formatCurrency(price);
              },
            },
            price: {
              read(price) {
                return formatCurrency(price);
              },
            },
            saving: {
              read(saving) {
                return formatCurrency(saving);
              },
            },
            discount: {
              read(discount) {
                return formatDiscount(discount);
              },
            },
            total: {
              read(total) {
                return formatCurrency(total);
              },
            },
            quantity: {
              read(quantity) {
                if (!quantity) return '-';
                return quantity;
              },
            },
          },
        },
      },
    }),
    credentials: 'include',
  });
};
