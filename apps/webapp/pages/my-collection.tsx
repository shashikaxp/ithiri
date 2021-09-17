import React from 'react';
import { ItemsGridContainer } from '../components/ItemsGridContainer';
import { Screen } from '../components/Screen';
import { useGetFavouritesQuery, useMeQuery } from '../generated/graphql';

const MyCollection: React.FC = () => {
  const { data } = useGetFavouritesQuery({ fetchPolicy: 'network-only' });

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });

  const isUserLoggedIn = meData?.me?.name ? true : false;

  return (
    <Screen>
      <div className="flex flex-col bg-background min-h-screen">
        {data?.getFavourites && (
          <ItemsGridContainer
            storeItems={data.getFavourites}
            isUserLoggedIn={isUserLoggedIn}
          />
        )}
      </div>
    </Screen>
  );
};

export default MyCollection;
