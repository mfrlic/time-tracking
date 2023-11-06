"use client";

import { login } from "@/app/api/client";
import AuthForm from "@/components/Auth/AuthForm";
import {
  authInitialValues,
  authValidationSchema,
} from "@/components/Auth/formProps";
import type { AuthFormValues } from "@/components/Auth/types";
import { auth } from "@/lib/firebase";
import { routes } from "@/utils/constants";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import type { FormikHelpers } from "formik";
import { Formik } from "formik";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { push } = useRouter();

  const handleRegister = async (
    { email, password }: AuthFormValues,
    { setFieldError }: FormikHelpers<AuthFormValues>
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredentials.user.getIdToken();

      const loginResult = await login({ idToken });

      if (loginResult) {
        push(routes.trackers);
      } else {
        setFieldError("password", "Something went wrong. Please try again");
      }
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        setFieldError("password", "Email already in use");
      } else {
        setFieldError("password", "Something went wrong. Please try again");
      }
    }
  };

  return (
    <Formik
      validationSchema={authValidationSchema}
      initialValues={authInitialValues}
      onSubmit={handleRegister}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, errors }) => (
        <AuthForm
          errors={errors}
          isSubmitting={isSubmitting}
          title="Register"
          buttonText="Register"
        />
      )}
    </Formik>
  );
}
