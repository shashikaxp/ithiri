import React from 'react';

export const CustomErrorMessage: React.FC = ({ children }) => {
  return <div className="text-red-500 py-2">{children}</div>;
};
