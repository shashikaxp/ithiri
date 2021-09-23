import React, { ReactElement } from 'react';
import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { NoResults } from '../components/Shared/NoResults';
import { Screen } from '../components/Shared/Screen';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import { useGetFavouritesQuery, useMeQuery } from '../generated/graphql';

const MyCollection = () => {
  const { data } = useGetFavouritesQuery({ fetchPolicy: 'network-only' });

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });

  const isUserLoggedIn = meData?.me?.name ? true : false;

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <WeekSelector />
      {data?.getFavourites && data.getFavourites.length > 0 && (
        <ItemsGridContainer
          storeItems={data.getFavourites}
          isUserLoggedIn={isUserLoggedIn}
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
