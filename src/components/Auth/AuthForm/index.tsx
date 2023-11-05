import clsx from "clsx";
import { Field, Form } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import styles from "./AuthForm.module.scss";
import type { AuthFormProps } from "../types";
import ErrorText from "@/components/ErrorText";

export default function AuthForm({
  isSubmitting,
  errors,
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

      <div className={styles.inputContainer}>
        <Field
          as={InputText}
          placeholder="Email"
          name="email"
          autoComplete="email"
          type="text"
          className={errors.email ? "p-invalid" : undefined}
        />
        <ErrorText text={errors.email} />
      </div>

      <div className={styles.inputContainer}>
        <span className="p-input-icon-right">
          <Field
            as={InputText}
            placeholder="Password"
            name="password"
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            className={clsx(styles.passwordInput, {
              "p-invalid": errors.password,
            })}
          />

          <Button
            className={styles.passwordButton}
            icon={
              <i
                className={clsx(
                  "pi",
                  showPassword ? "pi-eye-slash" : "pi-eye",
                  styles.passwordIcon
                )}
              />
            }
            size="small"
            rounded
            text
            type="button"
            aria-label="Password toggle"
            onClick={handleTogglePassword}
          />
        </span>
        <ErrorText text={errors.password} />
      </div>
      <Button label={buttonText} type="submit" disabled={isSubmitting} />
    </Form>
  );
}
