import React from 'react';

interface ButtonProps {
  loading: boolean;
}

export const Button: React.FC<
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ children, loading, ...rest }) => {
  return (
    <button
      disabled={loading}
      {...rest}
      className="flex justify-center items-center bg-primary rounded-lg text-white px-4 py-2 mt-4"
    >
      {children}
      {loading && (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-l-2 border-r-2 border-white ml-4"></div>
        </div>
      )}
    </button>
  );
};
