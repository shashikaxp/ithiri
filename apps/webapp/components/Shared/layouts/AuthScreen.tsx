import React from 'react';

export const AuthScreen: React.FC = ({ children }) => {
  return (
    <div className="flex  h-screen">
      <div className="bg-store md:w-1/2 lg:w-2/3 h-full bg-cover bg-right hidden md:block flex-shrink-0"></div>
      <div className="min-h-screen overflow-auto flex-grow">{children}</div>
    </div>
  );
};
