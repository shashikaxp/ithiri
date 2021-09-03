import React from 'react';
import { Field, Form, Formik, validateYupSchema } from 'formik';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';

import { RegisterSchema } from './../validations/register.schema';

interface registerProps {
  name: string;
}

const Register: React.FC<registerProps> = ({ name }) => {
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
          validationSchema={RegisterSchema}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form className="flex flex-col gap-2 w-80">
            <InputField name="name" type="text" />
            <InputField name="email" type="email" />
            <InputField name="password" type="password" />
            <InputField name="confirmPassword" type="password" />
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
