import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AuthForm from ".";
import { Formik } from "formik";
import { authInitialValues } from "../formProps";

describe("AuthForm", () => {
  it("renders the form with input fields and button", () => {
    const title = "Login";
    const buttonText = "Submit";

    render(
      <Formik initialValues={authInitialValues} onSubmit={() => {}}>
        {({ errors, isSubmitting }) => (
          <AuthForm
            title={title}
            buttonText={buttonText}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}
      </Formik>
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    const showPasswordButton = screen.getByLabelText("Password toggle");
    expect(showPasswordButton).toBeInTheDocument();

    const submitButton = screen.getByText(buttonText);
    expect(submitButton).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    const title = "Login";
    const buttonText = "Submit";

    render(
      <Formik initialValues={authInitialValues} onSubmit={() => {}}>
        {({ errors, isSubmitting }) => (
          <AuthForm
            title={title}
            buttonText={buttonText}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}
      </Formik>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");

    const showPasswordButton = screen.getByLabelText("Password toggle");
    fireEvent.click(showPasswordButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("submits the form", async () => {
    const title = "Login";
    const buttonText = "Submit";

    const onSubmit = jest.fn();

    const email = "aa@example.com";
    const password = "123456";

    render(
      <Formik initialValues={authInitialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <AuthForm
            title={title}
            buttonText={buttonText}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}
      </Formik>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: email } });

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: password } });

    const submitButton = screen.getByText(buttonText);
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        {
          email,
          password,
        },
        expect.anything()
      )
    );
  });
});
