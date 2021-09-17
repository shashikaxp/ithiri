import React from 'react';

import { useGetSearchItemsQuery } from '../../generated/graphql';
import { ItemsGridContainer } from '../ItemsGridContainer';

interface SearchContentProps {
  searchQuery: string;
  isUserLoggedIn: boolean;
}

export const SearchContent: React.FC<SearchContentProps> = ({
  searchQuery,
  isUserLoggedIn,
}) => {
  const { data } = useGetSearchItemsQuery({
    variables: { limit: 5, searchQuery },
  });

  return (
    <>
      {data?.searchItems && data.searchItems.length > 0 && (
        <ItemsGridContainer
          storeItems={data.searchItems}
          isUserLoggedIn={isUserLoggedIn}
        />
      )}
      <div className="p-4">
        {data?.searchItems.length === 0 && <div>No items were found</div>}
      </div>
    </>
  );
};
