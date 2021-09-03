import React from 'react';

// interface WrapperProps {}

export const Container: React.FC = ({ children }) => {
  return <div className="min-h-screen bg-gray-700">{children}</div>;
};
