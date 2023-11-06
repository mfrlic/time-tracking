import React from "react";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Menu from ".";
import { routes } from "@/utils/constants";

jest.mock("next/navigation");
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("Menu Component", () => {
  beforeAll(() => {
    mockUsePathname.mockReturnValue(routes.trackers);
  });

  it("should render the Menu component", () => {
    render(<Menu>Test Content</Menu>);
    const testContent = screen.getByText("Test Content");
    expect(testContent).toBeInTheDocument();
  });

  it("should render children when the current pathname is not login or register", () => {
    render(<Menu>Test Content</Menu>);
    const testContent = screen.getByText("Test Content");
    expect(testContent).toBeInTheDocument();
  });

  it("should not render children when the current pathname is login", () => {
    mockUsePathname.mockReturnValue(routes.login);
    render(<Menu>Test Content</Menu>);
    const testContent = screen.queryByText("Test Content");
    expect(testContent).toBeNull();
  });

  it("should not render children when the current pathname is register", () => {
    mockUsePathname.mockReturnValue(routes.register);
    render(<Menu>Test Content</Menu>);
    const testContent = screen.queryByText("Test Content");
    expect(testContent).toBeNull();
  });
});
