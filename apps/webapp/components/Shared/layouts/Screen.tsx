import React from 'react';
import { SideNav } from '../SideNav';

export const Screen: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <div className="flex-shrink-0">
        <SideNav />
      </div>
      <div className="max-h-screen overflow-auto flex-grow">{children}</div>
    </div>
  );
};
