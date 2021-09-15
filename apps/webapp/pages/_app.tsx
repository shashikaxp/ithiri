import { AppProps } from 'next/app';

import './styles.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getStoreItems: offsetLimitPagination(),
        },
      },
    },
  }),
  credentials: 'include',
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default App;
