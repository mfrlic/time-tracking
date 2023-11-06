import React from "react";
import { render, screen } from "@testing-library/react";
import Header from ".";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Header component", () => {
  it("renders without errors", () => {
    const { container } = render(<Header />);
    const headerElement = container.querySelector("header");
    expect(headerElement).toBeInTheDocument();
  });

  it("displays the logo and title", () => {
    render(<Header />);
    const logoElement = screen.getByAltText("devōt logo");
    const titleElement = screen.getByText("Tracking tool");

    expect(logoElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  it("renders menu items", () => {
    render(<Header />);
    const trackersMenuItem = screen.getByText("Trackers");
    const historyMenuItem = screen.getByText("History");
    const logoutMenuItem = screen.getByText("Logout");

    expect(trackersMenuItem).toBeInTheDocument();
    expect(historyMenuItem).toBeInTheDocument();
    expect(logoutMenuItem).toBeInTheDocument();
  });
});
