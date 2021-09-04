import { ErrorMessage, Field } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <>
      <Field {...props} name={props.name}></Field>
      <ErrorMessage name={props.name} />
    </>
  );
};
