import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC = () => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
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
            <Form className="flex flex-col gap-2 w-80 ">
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <button
                className="bg-blue-700 rounded-lg text-gray-300 px-4 py-2"
                type="submit"
              >
                Forgot password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default ForgotPassword;
