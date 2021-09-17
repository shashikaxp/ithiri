import React, { ReactElement } from 'react';

import { includes } from 'lodash';

import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { Screen } from '../components/Shared/Screen';
import { useGetStoreItemsQuery, useMeQuery } from '../generated/graphql';
import { useThisWeekItems } from '../hooks/useThisWeekItems';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';

const WeeklyList = () => {
  const { data } = useGetStoreItemsQuery({
    variables: {
      limit: 100,
      offset: 0,
    },
  });

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });
  const { items } = useThisWeekItems();

  const isUserLoggedIn = meData?.me?.name ? true : false;

  const weeklyItems = data?.getStoreItems.filter((item) => {
    return includes(items, item.itemId);
  });

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <WeekSelector />
      {weeklyItems && (
        <ItemsGridContainer
          storeItems={weeklyItems}
          isUserLoggedIn={isUserLoggedIn}
        />
      )}
    </div>
  );
};

WeeklyList.getLayout = function getLayout(page: ReactElement) {
  return <Screen>{page}</Screen>;
};

export default WeeklyList;
