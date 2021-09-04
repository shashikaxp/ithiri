import React from 'react';

// interface WrapperProps {}

export const Container: React.FC = ({ children }) => {
  return <div className="min-h-screen bg-blue-600">{children}</div>;
};
