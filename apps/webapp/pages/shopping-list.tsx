import React, { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineMail } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

import { find } from 'lodash';

import { Screen } from '../components/Shared/layouts/Screen';
import { WeekSelector } from '../components/Shared/WeekSelectorProps';
import {
  ShoppingList as ShoppingListType,
  useEmailShoppingListMutation,
  useGenerateShoppingListQuery,
} from '../generated/graphql';
import { useWeekItems } from '../hooks/useWeekItems';
import { useStore } from '../store';
import { ShoppingListContainer } from '../components/ShoppingListContainer';
import EmptyCart from './../assets/img/empty_cart.svg';
import Loader from './../assets/img/loader.svg';

const MyCollection = () => {
  const selectedWeek = useStore().selectedWeek;
  const { items } = useWeekItems();
  const [bestValueShoppingList, setBestValueShoppingList] =
    useState<ShoppingListType>();
  const [colesShoppingList, setColesShoppingList] =
    useState<ShoppingListType>();
  const [wollworthsShoppingList, setWoolworthsShoppingList] =
    useState<ShoppingListType>();

  const { data, loading } = useGenerateShoppingListQuery({
    variables: {
      weeklyItemInput: { week: selectedWeek, weeklyItems: items },
    },
  });

  const [emailComplete, setEmailComplete] = useState(false);

  const [emailShoppingList, { loading: emailShoppingListLoading }] =
    useEmailShoppingListMutation({
      variables: {
        weeklyItemInput: { week: selectedWeek, weeklyItems: items },
      },
      onCompleted: () => {
        setEmailComplete(true);
      },
    });

  useEffect(() => {
    if (data?.generateShoppingList.shoppingLists) {
      const shoppingLists = data.generateShoppingList.shoppingLists ?? [];

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

      {items.length > 0 && (
        <div
          className={`p-4 bg-primary flex items-center justify-center cursor-pointer text-white text-lg`}
          onClick={() => {
            if (emailShoppingListLoading || emailComplete) return;
            emailShoppingList();
          }}
        >
          {emailShoppingListLoading && <div>Please wait...</div>}

          {emailComplete && !emailShoppingListLoading && (
            <>
              Email sent
              <BsCheck className="h-8 w-8 ml-3" />
            </>
          )}
          {!emailComplete && !emailShoppingListLoading && (
            <div>
              Email me
              <AiOutlineMail className="h-8 w-8 ml-3" />
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="flex justify-center mt-8">
          <Image src={Loader} alt="loading.." />
        </div>
      )}

      {items.length === 0 && !loading ? (
        <div className="flex flex-col justify-center h-auto mt-20">
          <Image src={EmptyCart} height={250} width={250} alt="Empty cart" />
          <div className="text-xl font-semibold text-center mt-12">
            Your cart is empty, please add some items to weekly list
          </div>
        </div>
      ) : (
        <>
          <ShoppingListContainer shoppingListDetails={bestValueShoppingList} />
          <ShoppingListContainer shoppingListDetails={colesShoppingList} />
          <ShoppingListContainer shoppingListDetails={wollworthsShoppingList} />
        </>
      )}
    </div>
  );
};

MyCollection.getLayout = function getLayout(page: ReactElement) {
  return <Screen>{page}</Screen>;
};

export default MyCollection;
