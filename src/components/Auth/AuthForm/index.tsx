import clsx from "clsx";
import { Field, Form } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import styles from "./AuthForm.module.scss";
import type { AuthFormProps } from "../types";

export default function AuthForm({
  isSubmitting,
  title,
  buttonText,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form className={styles.root}>
      <h1 className={styles.title}>{title}</h1>

      <Field as={InputText} name="email" autoComplete="email" type="text" />

      <span className="p-input-icon-right">
        <Field
          as={InputText}
          name="password"
          autoComplete="password"
          type={showPassword ? "text" : "password"}
          className={styles.passwordInput}
        />
        <i
          onClick={handleTogglePassword}
          className={clsx(
            "pi",
            showPassword ? "pi-eye-slash" : "pi-eye",
            styles.passwordIconButton
          )}
        />
      </span>

      <Button label={buttonText} type="submit" disabled={isSubmitting} />
    </Form>
  );
}
