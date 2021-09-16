import React from 'react';
import { ItemCard } from '../ItemCard';

import { useGetSearchItemsQuery } from '../../generated/graphql';

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
    <div className="p-6 grid gap-3 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
      {data?.searchItems.map((item) => {
        return (
          <ItemCard
            key={item.id}
            isUserLoggedIn={isUserLoggedIn}
            storePriceResponse={item}
          />
        );
      })}
      {data?.searchItems.length === 0 && <div>No items were found</div>}
    </div>
  );
};
