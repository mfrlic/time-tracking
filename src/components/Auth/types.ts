import type { FormikErrors } from "formik";

type AuthFormValues = {
  email: string;
  password: string;
};

type AuthFormProps = {
  isSubmitting: boolean;
  errors: FormikErrors<AuthFormValues>;
  title: string;
  buttonText: string;
};

type AuthFooterProps = {
  href: string;
  title: string;
  linkText: string;
};

export type { AuthFormValues, AuthFormProps, AuthFooterProps };
