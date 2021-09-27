import React, { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { Formik, Form } from 'formik';
import router from 'next/router';
import Image from 'next/image';

import { InputField } from '../../components/Shared/forms/InputField';
import { useChangePasswordMutation } from './../../generated/graphql';
import { toErrorMap } from './../../../webapp/util/toErrorMap';
import { AuthScreen } from './../../../webapp/components/Shared/layouts/AuthScreen';
import { Button } from './../../../webapp/components/Shared/ui/Button';
import Logo from './../../assets/img/logo.png';

const ChangePassword: NextPage<{ token: string }> & {
  getLayout: (page: ReactElement) => ReactNode;
} = ({ token }) => {
  const [changePassword, { loading }] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-56 flex justify-center">
          <Image src={Logo} alt="logo" />
        </div>
        <div className="font-bold text-text text-2xl mt-8 mb-8">
          Reset Password
        </div>
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
              required
            />
            <Button role="submit" loading={loading}>
              Reset password
            </Button>
          </Form>
        </Formik>
        <div>
          {tokenError ? (
            <div>
              <div className="py-2 text-red-500 text-center">{tokenError}</div>
              <div className="flex items-center justify-center text-lg text-primary mt-8">
                <NextLink href="/forgot-password">Forgot Password</NextLink>
              </div>
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

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <AuthScreen>{page}</AuthScreen>;
};

export default ChangePassword;
