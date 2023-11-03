"use client";

import { useState } from "react";
import styles from "./Login.module.scss";
import { InputText } from "primereact/inputtext";
import clsx from "clsx";
import Link from "next/link";
import { routes } from "@/utils/constants";
import Image from "next/image";
import { Button } from "primereact/button";
import { Field, Form, Formik } from "formik";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { object, string } from "yup";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const ValidationSchema = object().shape({
    email: string()
      .email("A valid email is required")
      .required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <main className={styles.root}>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={({ email, password }) => {
          console.log(email, password);
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              console.log(errorCode, errorMessage);
            });
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form className={styles.container__main}>
            <h1 className={styles.title}>Register</h1>

            <Field
              as={InputText}
              name="email"
              autoComplete="email"
              type="text"
            />

            <span className="p-input-icon-right">
              <Field
                as={InputText}
                name="password"
                autoComplete="password"
                type={showPassword ? "text" : "password"}
              />
              <i
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className={clsx(
                  "pi",
                  showPassword ? "pi-eye-slash" : "pi-eye",
                  styles.passwordIconButton
                )}
              />
            </span>

            <Button label="Register" type="submit" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>

      <div className={styles.container__footer}>
        <Image
          src="/userPlusIcon.svg"
          width={95}
          height={95}
          alt="User plus icon"
          className={styles.footerIcon}
        />
        <div className={styles.footer}>
          <div className={styles.footerTitle}>Have an account?</div>
          <Link className={styles.footerLink} href={routes.login}>
            Login here
          </Link>
        </div>
      </div>
    </main>
  );
}
