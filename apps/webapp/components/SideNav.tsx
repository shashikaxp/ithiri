import { useApolloClient } from '@apollo/client';
import NextLink from 'next/link';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

// interface SideNavProps {}

export const SideNav: React.FC = () => {
  const { loading, data } = useMeQuery({
    fetchPolicy: 'no-cache',
  });

  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

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
        <div className="mt-4 p-4 flex gap-4 flex-col">
          {data?.me ? (
            <>
              <div className="text-lg">My collection</div>
              <div className="text-lg">Weekly list</div>
              <div className="text-lg">Shopping list</div>
              <div
                className="text-lg"
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore();
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <>
              <div className="text-lg">
                <NextLink href="/register">Register</NextLink>
              </div>
              <div className="text-lg">
                <NextLink href="/login">Login</NextLink>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return <div className="bg-primary-light w-64 h-screen">{body}</div>;
};
