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
  } else if (data?.me) {
    body = (
      <>
        <div
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
        >
          Logout
        </div>
        <div>{data.me.name}</div>
      </>
    );
  } else {
    body = (
      <div>
        <NextLink href="/login">Login</NextLink>
        <NextLink href="/register">Register</NextLink>
      </div>
    );
  }

  return <div className="bg-blue-400 w-1/4 h-screen">{body}</div>;
};
