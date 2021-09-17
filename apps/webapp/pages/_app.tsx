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
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getStoreItems: offsetLimitPagination(),
        },
      },
      StorePriceDetails: {
        fields: {
          price: {
            read(price) {
              return formatter.format(price);
            },
          },
          saving: {
            read(saving) {
              return formatter.format(saving);
            },
          },
          discount: {
            read(discount) {
              if (discount % 1 === 0.0) {
                return `${Math.floor(discount).toString()}%`;
              } else {
                return `*${Math.floor(discount).toString()}%`;
              }
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
