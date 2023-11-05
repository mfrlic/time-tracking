import React from "react";
import { render } from "@testing-library/react";
import PageTitle from ".";

describe("PageTitle", () => {
  it("renders title without an icon", () => {
    const title = "My Page Title";
    const { container } = render(<PageTitle title={title} />);

    const titleElement = container.querySelector(".root .title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);

    const iconElement = container.querySelector(".root .icon");
    expect(iconElement).not.toBeInTheDocument();
  });

  it("renders title with an icon", () => {
    const title = "My Page Title";
    const icon = "some-icon";
    const { container } = render(<PageTitle title={title} icon={icon} />);

    const titleElement = container.querySelector(".root .title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);

    const iconElement = container.querySelector("i");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement?.classList.contains(`pi-${icon}`)).toBe(true);
  });
});
