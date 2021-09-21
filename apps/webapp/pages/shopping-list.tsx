import React, { ReactElement, useEffect, useState } from 'react';

import { find } from 'lodash';

import { Screen } from '../components/Shared/Screen';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import {
  ShoppingList as ShoppingListType,
  useGenerateShoppingListQuery,
} from '../generated/graphql';
import { useWeekItems } from '../hooks/useWeekItems';
import { useStore } from '../store';
import { ShoppingListContainer } from '../components/ShoppingListContainer';

const MyCollection = () => {
  const selectedWeek = useStore().selectedWeek;
  const { items } = useWeekItems();
  const [bestValueShoppingList, setBestValueShoppingList] =
    useState<ShoppingListType>();
  const [colesShoppingList, setColesShoppingList] =
    useState<ShoppingListType>();
  const [wollworthsShoppingList, setWoolworthsShoppingList] =
    useState<ShoppingListType>();

  const { data } = useGenerateShoppingListQuery({
    variables: {
      weeklyItemInput: { week: selectedWeek, weeklyItems: items },
    },
  });

  useEffect(() => {
    if (data?.generateShoppingList.shoppingLists) {
      const shoppingLists = data.generateShoppingList.shoppingLists;

      const bestValueShoppingList = find(shoppingLists, {
        type: 'best-value',
      });
      const coles = find(shoppingLists, { type: 'coles' });
      const woolies = find(shoppingLists, { type: 'woolworths' });

      setBestValueShoppingList(bestValueShoppingList);
      setColesShoppingList(coles);
      setWoolworthsShoppingList(woolies);
    }
  }, [selectedWeek, data?.generateShoppingList.shoppingLists]);

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <WeekSelector />

      <ShoppingListContainer shoppingListDetails={bestValueShoppingList} />
      <ShoppingListContainer shoppingListDetails={colesShoppingList} />
      <ShoppingListContainer shoppingListDetails={wollworthsShoppingList} />
    </div>
  );
};

MyCollection.getLayout = function getLayout(page: ReactElement) {
  return <Screen>{page}</Screen>;
};

export default MyCollection;
