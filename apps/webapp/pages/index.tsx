import { useGetStoreItemsQuery } from '../generated/graphql';

import { Screen } from '../components/Screen';
import { ItemCard } from '../components/ItemCard';

export function Index() {
  const { data, fetchMore } = useGetStoreItemsQuery({
    variables: { limit: 10, offset: 0 },
  });

  return (
    <Screen>
      <div className="bg-gray-100 min-h-screen">
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
      </div>
    </Screen>
  );
}

export default Index;
