import React from 'react';
import NextList from 'next/link';

export const GuestModeButton: React.FC = () => {
  return (
    <div className="py-2 px-5 bg-white text-primary border-primary border rounded-full mt-8 hover:bg-primary hover:text-white">
      <NextList href="/">Guest Mode</NextList>
    </div>
  );
};
