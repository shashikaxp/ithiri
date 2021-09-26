import React, { ReactElement } from 'react';

import { includes } from 'lodash';

import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { Screen } from '../components/Shared/layouts/Screen';
import { useGetStoreItemsQuery, useMeQuery } from '../generated/graphql';
import { useWeekItems } from '../hooks/useWeekItems';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import { ITEM_PER_PAGE } from '../constants';
import { NoResults } from '../components/Shared/NoResults';
import { useStore } from '../store';

const WeeklyList = () => {
  const { data } = useGetStoreItemsQuery({
    variables: {
      limit: ITEM_PER_PAGE,
      offset: 0,
    },
  });

  const store = useStore()
  const { items } = useWeekItems();

  const weeklyItemIds = items.map((wi) => wi.itemId);

  const weeklyItems = data?.getStoreItems.filter((item) => {
    return includes(weeklyItemIds, item.itemId);
  });

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <WeekSelector />
      {weeklyItems && weeklyItems.length > 0 && (
        <ItemsGridContainer
          storeItems={weeklyItems}
          isUserLoggedIn={store.isAuthenticated}
        />
      )}
      {weeklyItems && weeklyItems.length === 0 && (
        <div>
          <NoResults />
        </div>
      )}
    </div>
  );
};

WeeklyList.getLayout = function getLayout(page: ReactElement) {
  return <Screen>{page}</Screen>;
};

export default WeeklyList;
