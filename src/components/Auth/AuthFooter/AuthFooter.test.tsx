import { render } from "@testing-library/react";
import AuthFooter from ".";

describe("AuthFooter", () => {
  it("renders the component", () => {
    const href = "/some-url";
    const title = "Title Text";
    const linkText = "Link Text";
    const { container, getByText } = render(
      <AuthFooter href={href} title={title} linkText={linkText} />
    );

    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();

    const linkElement = getByText(linkText);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("href", href);

    const iconElement = container.querySelector("svg");
    expect(iconElement).toBeInTheDocument();
  });
});
