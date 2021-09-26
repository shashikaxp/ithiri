import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Image from "next/image"

import Loading from './../../assets/img/loader.svg'
import { useWeekItems } from './../../hooks/useWeekItems';

import {
  namedOperations,
  useLogoutMutation,  
} from '../../generated/graphql';
import { useStore } from './../../store';

export const SideNav: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {

  const router = useRouter();
  const store = useStore()
  const apolloClient = useApolloClient();
  const { removeCookies } = useWeekItems();


  const [logout] = useLogoutMutation({
    onCompleted: async () => {
      await apolloClient.resetStore();
      removeCookies();
      store.setIsAuthenticated(false);
      store.setUserName(null);
      router.push('/');
    },

    refetchQueries: [namedOperations.Query.Me],
  });

  const getActiveRouteClass = (route: string) => {
    const commonClasses = 'text-lg p-3 cursor-pointer font-bold';
    if (router.pathname == route) {
      return `${commonClasses} text-primary-dark`;
    } else {
      return `${commonClasses}`;
    }
  };

  let body = null;

  
  if (!store.userName) {
    body = <div className="p-4 text-lg bg-primary-light flex justify-center">
      <Image src={Loading} alt="Please wait white fetching user data"/>
    </div>  ;
  } else {
    const greeting = 'Hey ' + store.userName
    body = (
      <>
        <div className="flex flex-col justify-center align-middle bg-primary-dark p-4">
          <div className="flex justify-center  ">
            <div className="bg-primary-light rounded-full w-24 h-24 flex align-middle justify-center">
              <img
                className="h-24 p-4 w-auto rounded-full"
                src={`https://avatars.dicebear.com/api/gridy/${greeting}.svg`}
                alt="profile picture"
              />
            </div>
          </div>
          <div className="text-center text-xl mt-2 text-white">{greeting}</div>
        </div>
        <div className="mt-8 flex  flex-col">
          {store.isAuthenticated ? (
            <>
              <NextLink href="/">
                <div className={getActiveRouteClass('/')}>Home</div>
              </NextLink>

              <NextLink href="/my-collection">
                <div className={getActiveRouteClass('/my-collection')}>
                  My collection
                </div>
              </NextLink>

              <NextLink href="/weekly-list">
                <div className={getActiveRouteClass('/weekly-list')}>
                  Weekly list
                </div>
              </NextLink>

              <NextLink href="/shopping-list">
                <div className={getActiveRouteClass('/shopping-list')}>
                  Shopping list
                </div>
              </NextLink>

              <div
                className={getActiveRouteClass('') + ' cursor-pointer'}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <NextLink href="/register">
                <div className={getActiveRouteClass('')}>Register</div>
              </NextLink>
              <NextLink href="/login">
                <div className={getActiveRouteClass('')}>Login</div>
              </NextLink>
            </>
          )}
        </div>
      </>
    );
  }

  return <div className={className}>{body}</div>;
};
