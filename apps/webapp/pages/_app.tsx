import './styles.css';
import { ApolloProvider } from '@apollo/client';

import { CookiesProvider } from 'react-cookie';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { getApollo } from '../util/configApollo';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <CookiesProvider>
        <ApolloProvider client={getApollo()}>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
