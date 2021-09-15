import { useState } from 'react';

import { debounce } from 'lodash';

import { useGetStoreItemsQuery } from '../generated/graphql';
import { Screen } from '../components/Screen';
import { ItemCard } from '../components/ItemCard';
import { SearchContent } from '../components/Home/SearchContent';

export function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedFn = debounce(setSearchQuery, 250);

  const { data, fetchMore } = useGetStoreItemsQuery({
    variables: { limit: 15, offset: 0 },
  });

  return (
    <Screen>
      <div className="flex flex-col bg-background min-h-screen">
        <div className="m-4 p-2">
          <input
            className="w-full p-4 focus:outline-none focus:ring focus:border-blue-300 text-text"
            type="text"
            placeholder="Search items..."
            onChange={(e) => debouncedFn(e.target.value)}
          />
        </div>

        {searchQuery !== '' ? (
          <SearchContent searchQuery={searchQuery} />
        ) : (
          <>
            <div className="p-6 grid gap-3 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
              {data?.getStoreItems.map((item) => {
                return <ItemCard key={item.id} storePriceResponse={item} />;
              })}
            </div>
            <button
              onClick={() =>
                fetchMore({ variables: { offset: data?.getStoreItems.length } })
              }
            >
              More
            </button>
          </>
        )}
      </div>
    </Screen>
  );
}

export default Index;
