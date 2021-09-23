import React from 'react';

export const AuthScreen: React.FC = ({ children }) => {
  return (
    <div className="flex  h-screen">
      <div className="bg-store w-2/3 h-full bg-cover bg-right"></div>
      <div className="max-h-screen overflow-auto flex-grow">{children}</div>
    </div>
  );
};
