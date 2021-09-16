import React from 'react';
import { Form, Formik } from 'formik';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';

import { namedOperations, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Login: React.FC = () => {
  const router = useRouter();
  const [login] = useLoginMutation({
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.GetStoreItems],
  });

  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
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
              router.push('/');
            }
          }}
        >
          <Form className="flex flex-col gap-2 w-80 ">
            <InputField name="email" type="email" placeholder="Email" />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            <button
              className="bg-blue-700 rounded-lg text-gray-300 px-4 py-2"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
        <NextLink href="/forgot-password">Forgot password ?</NextLink>
      </div>
    </Container>
  );
};

export default Login;
