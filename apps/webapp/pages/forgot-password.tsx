import { Formik, Form } from 'formik';
import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import { InputField } from '../components/Shared/forms/InputField';
import { AuthScreen } from '../components/Shared/layouts/AuthScreen';
import { useForgotPasswordMutation } from '../generated/graphql';
import Logo from './../assets/img/logo.png';
import { Button } from '../components/Shared/ui/Button';

const ForgotPassword = () => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword, { loading }] = useForgotPasswordMutation();

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
          <div className="py-12 px-8 text-center">
            If we found an account associated with that username, we have sent
            password reset instructions to the primary email address on the
            account.
          </div>
        ) : (
          <Form className="flex flex-col gap-2 w-full p-12">
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              required
            />
            <Button role="submit" loading={loading}>
              Forgot password
            </Button>
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
