import React from 'react';
import { ItemsGridContainer } from '../components/ItemsGridContainer';
import { Screen } from '../components/Screen';
import { useGetStoreItemsQuery, useMeQuery } from '../generated/graphql';

const MyCollection: React.FC = () => {
  const { data } = useGetStoreItemsQuery({
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });

  const isUserLoggedIn = meData?.me?.name ? true : false;

  const favorites = data?.getStoreItems.filter((item) => item.isFavourite);

  return (
    <Screen>
      <div className="flex flex-col bg-background min-h-screen">
        {favorites && (
          <ItemsGridContainer
            storeItems={favorites}
            isUserLoggedIn={isUserLoggedIn}
          />
        )}
      </div>
    </Screen>
  );
};

export default MyCollection;
