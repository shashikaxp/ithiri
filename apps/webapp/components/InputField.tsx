import { ErrorMessage, Field } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <div>
      <Field
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none  focus:border-primary"
        {...props}
        name={props.name}
      ></Field>
      <ErrorMessage name={props.name} />
    </div>
  );
};
