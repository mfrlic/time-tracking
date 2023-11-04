"use client";

import AuthForm from "@/components/Auth/AuthForm";
import {
  authInitialValues,
  authValidationSchema,
} from "@/components/Auth/formProps";
import type { AuthFormValues } from "@/components/Auth/types";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";

export default function RegisterForm() {
  const handleRegister = async ({ email, password }: AuthFormValues) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(userCredentials);
  };

  return (
    <Formik
      validationSchema={authValidationSchema}
      initialValues={authInitialValues}
      onSubmit={handleRegister}
    >
      {({ isSubmitting }) => (
        <AuthForm
          isSubmitting={isSubmitting}
          title="Register"
          buttonText="Register"
        />
      )}
    </Formik>
  );
}
