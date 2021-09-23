import { Formik, Form } from 'formik';
import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import { InputField } from '../components/InputField';
import { AuthScreen } from '../components/Shared/layouts/AuthScreen';
import { useForgotPasswordMutation } from '../generated/graphql';
import Logo from './../assets/img/logo.png';

const ForgotPassword = () => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-56 flex justify-center">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="font-bold text-text text-2xl mt-8">Forgot password</div>

      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {complete ? (
          <div>We sent you and email for rest the password</div>
        ) : (
          <Form className="flex flex-col gap-2 w-full p-12">
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              required
            />
            <button
              className="bg-primary  rounded-lg text-white px-4 py-2"
              type="submit"
            >
              Forgot password
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex text-primary justify-center w-full text-lg px-12">
        <div className="text-center w-full">
          <NextLink href="/login">Login</NextLink>
        </div>
        <div className=" text-center w-full">
          <NextLink href="/register">Register</NextLink>
        </div>
      </div>
    </div>
  );
};

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <AuthScreen>{page}</AuthScreen>;
};

export default ForgotPassword;
