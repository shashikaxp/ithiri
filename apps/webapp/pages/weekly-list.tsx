import React, { ReactElement } from 'react';
import Image from 'next/image';

import { includes } from 'lodash';

import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { Screen } from '../components/Shared/layouts/Screen';
import { useGetWeeklyItemsQuery } from '../generated/graphql';
import { useWeekItems } from '../hooks/useWeekItems';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';

import { NoResults } from '../components/Shared/NoResults';
import { useStore } from '../store';
import Loader from './../assets/img/loader.svg';

const WeeklyList = () => {
  const store = useStore();
  const { items } = useWeekItems();

  const weeklyItemIds = items.map((wi) => wi.itemId);
  const { data, loading } = useGetWeeklyItemsQuery({
    variables: { itemIds: weeklyItemIds },
  });

  const weeklyItems = data?.getStoreItemsByIds.filter((item) => {
    return includes(weeklyItemIds, item.itemId);
  });

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <WeekSelector />

      {loading && (
        <div className="flex justify-center mt-8">
          <Image src={Loader} alt="loading.." />
        </div>
      )}

      {weeklyItems && weeklyItems.length > 0 && (
        <ItemsGridContainer
          storeItems={weeklyItems}
          isUserLoggedIn={store.isAuthenticated}
        />
      )}
      {!weeklyItems && !loading && (
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
