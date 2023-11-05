import { render, screen } from "@testing-library/react";
import ErrorText from ".";

describe("ErrorText", () => {
  it("should render the provided text", () => {
    const text = "This is an error message";
    render(<ErrorText text={text} />);
    const labelElement = screen.getByText(text);
    expect(labelElement).toBeInTheDocument();
  });

  it("should render without text", () => {
    const { container } = render(<ErrorText />);
    const labelElement = container.querySelector("label");
    expect(labelElement).toBeInTheDocument();
  });
});
