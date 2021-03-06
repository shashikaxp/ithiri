import React, { useEffect, useState } from 'react';
import { SideNav } from '../SideNav';
import { CgMenu } from 'react-icons/cg';
import Router from 'next/router';
import { useMeQuery } from './../../../../webapp/generated/graphql';
import { useStore } from './../../../../webapp/store';

export const Screen: React.FC = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const store = useStore();

  Router.router?.events.on('routeChangeStart', (_) => {
    setShowSideBar(false);
  });

  const { data: meData, loading } = useMeQuery();

  useEffect(() => {
    const userName = meData?.me?.name ? meData.me.name : 'Guest';
    const isAuthenticated = userName !== 'Guest';
    if (!loading) {
      store.setUserName(userName);
      store.setIsAuthenticated(isAuthenticated);
    }
  }, [loading]);

  const getSideBarClass = () => {
    if (!showSideBar) {
      return '-translate-x-full';
    }
    return '';
  };

  return (
    <>
      <div className="flex justify-between items-center pt-4 px-4  text-white bg-primary-dark md:hidden">
        <div className="text-4xl font-secondary ">ithiri</div>
        <div>
          <CgMenu
            className="text-2xl cursor-pointer"
            onClick={() => setShowSideBar((sb) => !sb)}
          />
        </div>
      </div>
      <div className="flex ">
        <SideNav
          className={`absolute inset-y-0 left-0 transform transition duration-200 ease-in-out bg-primary-light w-64 h-screen z-10 md:relative md:translate-x-0 ${getSideBarClass()}`}
        />
        <div className="max-h-screen overflow-auto flex-1">{children}</div>
      </div>
    </>
  );
};
