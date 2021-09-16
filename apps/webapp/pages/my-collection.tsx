import React from 'react';
import { ItemCard } from '../components/ItemCard';
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
        <div className="p-6 grid gap-3 grid-cols-auto">
          {favorites?.map((fv) => {
            return (
              <ItemCard
                key={fv.id}
                storePriceResponse={fv}
                isUserLoggedIn={isUserLoggedIn}
              ></ItemCard>
            );
          })}
        </div>
      </div>
    </Screen>
  );
};

export default MyCollection;
