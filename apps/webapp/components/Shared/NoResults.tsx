import React from 'react';
import Image from 'next/image';
import NotFound from './../../assets/img/not_found.svg';

export const NoResults: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-auto mt-20">
      <Image src={NotFound} height={250} width={250} alt="No results" />
      <div className="text-xl font-semibold text-center mt-12">No Results</div>
    </div>
  );
};
