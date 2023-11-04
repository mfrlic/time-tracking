"use client";

import AuthForm from "@/components/Auth/AuthForm";
import {
  authInitialValues,
  authValidationSchema,
} from "@/components/Auth/formProps";
import type { AuthFormValues } from "@/components/Auth/types";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import { login } from "../../api/client";
import { routes } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { push } = useRouter();
  const handleLogin = async ({ email, password }: AuthFormValues) => {
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
  };

  return (
    <Formik
      validationSchema={authValidationSchema}
      initialValues={authInitialValues}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <AuthForm
          isSubmitting={isSubmitting}
          title="Login"
          buttonText="Login"
        />
      )}
    </Formik>
  );
}
