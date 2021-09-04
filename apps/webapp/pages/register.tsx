import React from 'react';
import { Form, Formik } from 'formik';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';

import { RegisterSchema } from '../../api/src/validations/register.schema';

import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../util/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {
  name: string;
}

const Register: React.FC<registerProps> = ({ name }) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Container>
      <div className="flex items-center justify-center h-screen">
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
          <Form className="flex flex-col gap-2 w-80">
            <InputField name="name" type="text" placeholder="Name" />
            <InputField name="email" type="email" placeholder="Email" />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
            />
            <InputField
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
            <button
              className="bg-blue-700 rounded-lg text-gray-300 px-4 py-2"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default Register;
