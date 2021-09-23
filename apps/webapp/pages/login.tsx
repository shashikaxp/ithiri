import React, { ReactElement } from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import Image from 'next/image';
import Logo from './../assets/img/logo.png';
import NextLink from 'next/link';

import { namedOperations, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { AuthScreen } from '../components/Shared/layouts/AuthScreen';

const Login = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [login] = useLoginMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.GetStoreItems],
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-56 flex justify-center">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="font-bold text-text text-2xl mt-8">Login</div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await login({ variables: values });
          if (data?.login.errors) {
            setErrors(toErrorMap(data?.login.errors));
          } else {
            await apolloClient.clearStore();
            router.push('/');
          }
        }}
      >
        <Form className="flex flex-col gap-2 w-full p-12">
          <InputField name="email" type="email" placeholder="Email" />
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <button
            className="bg-primary rounded-lg text-white px-4 py-2 mt-4"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
      <div className="mt-2">
        Not registered yet?
        <span className="ml-1 text-primary">
          <NextLink href="/register">Create an account</NextLink>
        </span>
      </div>
      <div className="mt-4 text-primary">
        <NextLink href="/forgot-password">Forgot password</NextLink>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthScreen>{page}</AuthScreen>;
};

export default Login;
