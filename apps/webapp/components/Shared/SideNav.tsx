import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
  namedOperations,
  useLogoutMutation,
  useMeQuery,
} from '../../generated/graphql';
import { useThisWeekItems } from '../../hooks/useThisWeekItems';

// interface SideNavProps {}

export const SideNav: React.FC = () => {
  const { loading, data } = useMeQuery({
    fetchPolicy: 'network-only',
  });
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { items } = useThisWeekItems();

  const [logout] = useLogoutMutation({
    onCompleted: async () => {
      await apolloClient.resetStore();
    },

    refetchQueries: [namedOperations.Query.Me],
  });

  const getActiveRouteClass = (route: string) => {
    const commonClasses = 'text-lg p-3 cursor-pointer font-bold';
    if (router.pathname == route) {
      return `${commonClasses} text-primary`;
    } else {
      return `${commonClasses}`;
    }
  };

  let body = null;

  if (loading) {
    body = null;
  } else {
    const userName = data?.me ? data.me.name : 'Stranger';
    body = (
      <div>
        <div className="flex flex-col justify-center align-middle bg-primary p-4">
          <div className="flex justify-center  ">
            <div className="bg-primary-light rounded-full w-24 h-24 flex align-middle justify-center">
              <img
                className="h-24 w-auto rounded-full"
                src={`https://avatars.dicebear.com/api/miniavs/${userName}.svg`}
                alt="profile picture"
              />
            </div>
          </div>
          <div className="text-center text-xl mt-2 text-white">
            Hey {userName}
          </div>
        </div>
        <div className="mt-8 flex  flex-col">
          {data?.me ? (
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
                <div
                  className={
                    getActiveRouteClass('/weekly-list') + ' flex align-center'
                  }
                >
                  <div>Weekly list</div>
                  <div className="flex align-middle w-7 rounded-full justify-center ml-4 bg-primary">
                    <div className="text-white">{items.length}</div>
                  </div>
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
      </div>
    );
  }

  return <div className="bg-primary-light w-64 h-screen">{body}</div>;
};
