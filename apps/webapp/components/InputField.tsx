import { ErrorMessage, Field } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <>
      <Field name={props.name} type={props.type}></Field>
      <ErrorMessage name={props.name} />
    </>
  );
};
