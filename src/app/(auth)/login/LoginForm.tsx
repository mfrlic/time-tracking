"use client";

import AuthForm from "@/components/Auth/AuthForm";
import {
  authInitialValues,
  authValidationSchema,
} from "@/components/Auth/formProps";
import type { AuthFormValues } from "@/components/Auth/types";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { FormikHelpers } from "formik";
import { Formik } from "formik";
import { login } from "../../api/client";
import { routes } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function LoginForm() {
  const { push } = useRouter();
  const handleLogin = async (
    { email, password }: AuthFormValues,
    { setFieldError }: FormikHelpers<AuthFormValues>
  ) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredentials.user.getIdToken();

      const loginResult = await login({ idToken });

      if (loginResult) {
        push(routes.trackers);
      }
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-login-credentials"
      ) {
        setFieldError("password", "Invalid email or password");
      } else {
        setFieldError("password", "Something went wrong. Please try again");
      }
    }
  };

  return (
    <Formik
      validationSchema={authValidationSchema}
      initialValues={authInitialValues}
      onSubmit={handleLogin}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, errors }) => (
        <AuthForm
          isSubmitting={isSubmitting}
          errors={errors}
          title="Login"
          buttonText="Login"
        />
      )}
    </Formik>
  );
}
