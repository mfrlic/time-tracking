import { render } from "@testing-library/react";
import PageTitle from ".";

describe("PageTitle", () => {
  it("renders title without an icon", () => {
    const title = "My Page Title";
    const { container } = render(<PageTitle title={title} />);

    const titleElement = container.querySelector(".root .title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
  });

  it("renders title with an icon", () => {
    const title = "My Page Title";
    const icon = <i>some-icon</i>;
    const { container } = render(<PageTitle title={title} icon={icon} />);

    const titleElement = container.querySelector(".root .title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);

    const iconElement = container.querySelector("i");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent("some-icon");
  });
});
