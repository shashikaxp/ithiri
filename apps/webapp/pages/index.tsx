import { ReactElement, useState } from 'react';

import { debounce } from 'lodash';

import { useGetStoreItemsQuery, useMeQuery } from '../generated/graphql';
import { SearchContent } from '../components/Home/SearchContent';
import { ItemsGridContainer } from '../components/Shared/ItemsGridContainer';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import { Screen } from '../components/Shared/layouts/Screen';
import { ITEM_PER_PAGE } from '../constants';

export const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: meData } = useMeQuery({ fetchPolicy: 'network-only' });

  const isUserLoggedIn = meData?.me?.name ? true : false;

  const debouncedFn = debounce(setSearchQuery, 250);

  const { data, fetchMore } = useGetStoreItemsQuery({
    variables: { limit: ITEM_PER_PAGE, offset: 0 },
  });

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <div className="p-4  bg-primary-dark sticky top-0">
        <input
          className="w-full rounded-md p-4 focus:outline-none  text-text"
          type="text"
          placeholder="Search items..."
          onChange={(e) => debouncedFn(e.target.value)}
        />
      </div>

      <WeekSelector />

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
