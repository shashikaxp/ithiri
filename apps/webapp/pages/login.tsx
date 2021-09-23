import React from 'react';
import { Form, Formik } from 'formik';
import { InputField } from '../components/InputField';
import Image from 'next/image';
import Logo from './../assets/img/logo.png';

import { namedOperations, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useApolloClient } from '@apollo/client';

const Login: React.FC = () => {
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [login] = useLoginMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.GetStoreItems],
  });

  return (
    <div className="flex  h-screen">
      <div className="bg-store w-2/3 h-full bg-cover bg-right"></div>
      <div className="flex flex-col w-1/3 items-center justify-center h-screen">
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
        <NextLink href="/forgot-password">Forgot password ?</NextLink>
      </div>
    </div>
  );
};

export default Login;
