import React from 'react';

// interface WrapperProps {}

export const Container: React.FC = ({ children }) => {
  return <div className="min-h-screen bg-gray">{children}</div>;
};
