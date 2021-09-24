import React, { useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { Formik, Form } from 'formik';
import router from 'next/router';

import { InputField } from '../../components/Shared/forms/InputField';
import { useChangePasswordMutation } from './../../generated/graphql';
import { toErrorMap } from './../../../webapp/util/toErrorMap';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Formik
          initialValues={{
            newPassword: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await changePassword({
              variables: {
                password: values.newPassword,
                token,
              },
            });

            if (data?.changePassword.errors) {
              const errorMap = toErrorMap(data.changePassword.errors);
              if ('token' in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
              return;
            }
            router.push('/');
          }}
        >
          <Form className="flex flex-col gap-2 w-80 ">
            <InputField
              name="newPassword"
              type="password"
              placeholder="New Password"
            />
            <button
              className="bg-blue-700 rounded-lg text-gray-300 px-4 py-2"
              type="submit"
            >
              Reset password
            </button>
          </Form>
        </Formik>
        <div>
          {tokenError ? (
            <div>
              <div>{tokenError}</div>
              <NextLink href="/forgot-password">Forgot Password</NextLink>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
