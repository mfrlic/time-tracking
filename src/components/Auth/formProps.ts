import { object, string } from "yup";

const authValidationSchema = object().shape({
  email: string()
    .email("A valid email is required")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const authInitialValues = {
  email: "",
  password: "",
};

export { authInitialValues, authValidationSchema };
