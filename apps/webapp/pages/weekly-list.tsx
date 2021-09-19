import React, { ReactElement } from 'react';

import { includes } from 'lodash';

import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { Screen } from '../components/Shared/Screen';
import { useGetStoreItemsQuery, useMeQuery } from '../generated/graphql';
import { useWeekItems } from '../hooks/useWeekItems';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import { ITEM_PER_PAGE } from '../constants';

const WeeklyList = () => {
  const { data } = useGetStoreItemsQuery({
    variables: {
      limit: ITEM_PER_PAGE,
      offset: 0,
    },
  });

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });
  const { items } = useWeekItems();

  const isUserLoggedIn = meData?.me?.name ? true : false;
  const weeklyItemIds = items.map((wi) => wi.itemId);

  const weeklyItems = data?.getStoreItems.filter((item) => {
    return includes(weeklyItemIds, item.itemId);
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
