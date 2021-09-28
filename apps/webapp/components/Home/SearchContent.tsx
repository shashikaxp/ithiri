import React, { useEffect } from 'react';

import { useGetSearchItemsQuery } from '../../generated/graphql';
import { ItemsGridContainer } from '../Shared/ItemsGridContainer';
import { useStore } from './../../../webapp/store';
import { NoResults } from '../Shared/NoResults';

interface SearchContentProps {
  searchQuery: string;
  isUserLoggedIn: boolean;
}

export const SearchContent: React.FC<SearchContentProps> = ({
  searchQuery,
  isUserLoggedIn,
}) => {
  const store = useStore();

  const { data, refetch } = useGetSearchItemsQuery({
    variables: { limit: 5, searchQuery, weekType: store.selectedWeek },
  });

  useEffect(() => {
    refetch();
  }, [store.selectedWeek, refetch]);

  return (
    <>
      {data?.searchItems && data.searchItems.length > 0 && (
        <ItemsGridContainer
          storeItems={data.searchItems}
          isUserLoggedIn={isUserLoggedIn}
        />
      )}
      <div className="p-4">
        {data?.searchItems.length === 0 && <NoResults />}
      </div>
    </>
  );
};
