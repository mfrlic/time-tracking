import { render, screen } from "@testing-library/react";
import ErrorText from ".";

describe("ErrorText", () => {
  it("should render the provided text", () => {
    const text = "This is an error message";
    render(<ErrorText text={text} />);
    const labelElement = screen.queryByTestId("error-text");
    expect(labelElement).toBeInTheDocument();
  });

  it("should render without text", () => {
    render(<ErrorText />);
    const labelElement = screen.queryByTestId("error-text");
    expect(labelElement).toBeInTheDocument();
  });
});
