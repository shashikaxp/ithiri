import React, { ReactElement } from 'react';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { InputField } from '../components/Shared/forms/InputField';
import Logo from './../assets/img/logo.png';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { AuthScreen } from '../components/Shared/layouts/AuthScreen';
import { GuestModeButton } from '../components/Shared/GuestModeButton';
import { Button } from '../components/Shared/ui/Button';

const Register = () => {
  const router = useRouter();
  const [register, { loading }] = useRegisterMutation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-56 flex justify-center">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="font-bold text-text text-2xl mt-8">Register</div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await register({ variables: values });
          if (data?.register.errors) {
            setErrors(toErrorMap(data?.register.errors));
          } else {
            router.push('/');
          }
        }}
      >
        <Form className="flex flex-col gap-2 w-full p-12">
          <InputField name="name" type="text" placeholder="Name" required />
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="username"
            required
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />
          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            required
          />
          <Button role="submit" loading={loading}>
            Register
          </Button>
        </Form>
      </Formik>
      <div className="mt-2">
        Already have a account?
        <span className="ml-1 text-primary">
          <NextLink href="/login">Login</NextLink>
        </span>
      </div>
      <GuestModeButton />
    </div>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthScreen>{page}</AuthScreen>;
};

export default Register;
