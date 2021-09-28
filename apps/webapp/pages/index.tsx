import { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';

import { debounce } from 'lodash';

import { useGetStoreItemsQuery, useMeQuery } from '../generated/graphql';
import { SearchContent } from '../components/Home/SearchContent';
import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import { Screen } from '../components/Shared/layouts/Screen';
import { ITEM_PER_PAGE } from '../constants';
import Loader from './../assets/img/loader.svg';
import { useStore } from '../store';

export const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: meData } = useMeQuery();
  const isUserLoggedIn = meData?.me?.name ? true : false;
  const debouncedFn = debounce(setSearchQuery, 250);
  const store = useStore();

  const {
    data,
    fetchMore,
    loading: itemLoading,
    refetch,
  } = useGetStoreItemsQuery({
    variables: {
      limit: ITEM_PER_PAGE,
      offset: 0,
      weekType: store.selectedWeek,
    },
  });

  useEffect(() => {
    refetch();
  }, [store.selectedWeek, refetch]);

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <div className="px-4 pb-4 pt-2 md:pt-4  bg-primary-dark sticky top-0">
        <input
          className="w-full rounded-3xl  p-4 focus:outline-none  text-text"
          type="text"
          placeholder="Search items..."
          onChange={(e) => debouncedFn(e.target.value)}
        />
      </div>

      <WeekSelector />

      {itemLoading && (
        <div className="flex justify-center mt-8">
          <Image src={Loader} alt="loading.." />
        </div>
      )}

      {searchQuery !== '' ? (
        <SearchContent
          isUserLoggedIn={isUserLoggedIn}
          searchQuery={searchQuery}
        />
      ) : (
        data?.getStoreItems && (
          <>
            <ItemsGridContainer
              storeItems={data.getStoreItems}
              isUserLoggedIn={isUserLoggedIn}
            />
            <div className="flex justify-center mt-4 mb-8 text-primary">
              <button
                className="px-10 py-2 bg-white rounded-full text-lg font-bold"
                onClick={() =>
                  fetchMore({
                    variables: { offset: data?.getStoreItems.length },
                  })
                }
              >
                More
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Screen>{page}</Screen>;
};

export default Index;
