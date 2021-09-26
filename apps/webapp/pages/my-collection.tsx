import React, { ReactElement } from 'react';
import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { NoResults } from '../components/Shared/NoResults';
import { Screen } from '../components/Shared/layouts/Screen';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import { useGetFavouritesQuery } from '../generated/graphql';
import { useStore } from '../store';

const MyCollection = () => {
  const { data } = useGetFavouritesQuery({ fetchPolicy: 'network-only' });

  const store = useStore();

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <WeekSelector />
      {data?.getFavourites && data.getFavourites.length > 0 && (
        <ItemsGridContainer
          storeItems={data.getFavourites}
          isUserLoggedIn={store.isAuthenticated}
        />
      )}
      {data?.getFavourites && data.getFavourites.length === 0 && (
        <div>
          <NoResults />
        </div>
      )}
    </div>
  );
};

MyCollection.getLayout = function getLayout(page: ReactElement) {
  return <Screen>{page}</Screen>;
};

export default MyCollection;
