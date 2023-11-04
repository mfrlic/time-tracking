type AuthFormValues = {
  email: string;
  password: string;
};

type AuthFormProps = {
  isSubmitting: boolean;
  title: string;
  buttonText: string;
};

type AuthFooterProps = {
  href: string;
  title: string;
  linkText: string;
};

export type { AuthFormValues, AuthFormProps, AuthFooterProps };
