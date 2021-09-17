import React from 'react';

import { includes } from 'lodash';

import { ItemsGridContainer } from '../components/ItemsGridContainer';
import { Screen } from '../components/Screen';
import { useGetStoreItemsQuery, useMeQuery } from '../generated/graphql';
import { useThisWeekItems } from '../hooks/useThisWeekItems';
import { WeekSelector } from '../components/WeekSelectorProps';

const WeeklyList: React.FC = () => {
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
    <Screen>
      <div className="flex flex-col bg-background min-h-screen">
        <WeekSelector />
        {weeklyItems && (
          <ItemsGridContainer
            storeItems={weeklyItems}
            isUserLoggedIn={isUserLoggedIn}
          />
        )}
      </div>
    </Screen>
  );
};

export default WeeklyList;
