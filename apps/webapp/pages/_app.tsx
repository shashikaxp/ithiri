import './styles.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { CookiesProvider } from 'react-cookie';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const client = new ApolloClient({
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
              if (!price) return '-';
              return formatter.format(price);
            },
          },
          nwPrice: {
            read(price) {
              if (!price) return '-';
              return formatter.format(price);
            },
          },
          cwSavings: {
            read(saving) {
              if (!saving) return '-';
              return formatter.format(saving);
            },
          },
          nwSavings: {
            read(saving) {
              if (!saving) return '-';
              return formatter.format(saving);
            },
          },
          cwDiscount: {
            read(discount) {
              if (!discount) return '-';
              if (discount % 1 === 0.0) {
                return `${Math.floor(discount).toString()}%`;
              } else {
                return `*${Math.floor(discount).toString()}%`;
              }
            },
          },
          nwDiscount: {
            read(discount) {
              if (!discount) return '-';
              if (discount % 1 === 0.0) {
                return `${Math.floor(discount).toString()}%`;
              } else {
                return `*${Math.floor(discount).toString()}%`;
              }
            },
          },
        },
      },
      ShoppingList: {
        fields: {
          totalSavings: {
            read(price) {
              return formatter.format(price);
            },
          },
        },
      },
      ShoppingItem: {
        fields: {
          originalPrice: {
            read(price) {
              if (!price) return '-';
              return formatter.format(price);
            },
          },
          price: {
            read(price) {
              if (!price) return '-';
              return formatter.format(price);
            },
          },
          saving: {
            read(saving) {
              if (!saving) return '-';
              return formatter.format(saving);
            },
          },
          discount: {
            read(discount) {
              if (!discount) return '-';
              if (discount % 1 === 0.0) {
                return `${Math.floor(discount).toString()}%`;
              } else {
                return `*${Math.floor(discount).toString()}%`;
              }
            },
          },
          total: {
            read(total) {
              if (!total) return '-';
              return formatter.format(total);
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

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <CookiesProvider>
        <ApolloProvider client={client}>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
