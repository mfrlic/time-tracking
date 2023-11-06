import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MenuItem from ".";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/api/client";
import { routes } from "@/utils/constants";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/app/api/client", () => ({
  logout: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe("MenuItem Component", () => {
  beforeAll(() => {
    mockUsePathname.mockReturnValue(routes.trackers);
  });

  it("should render the MenuItem component", () => {
    render(
      <MenuItem href={routes.trackers} icon="pi-trackers" title="Trackers123" />
    );
    const menuItem = screen.getByTestId("menu-item");
    expect(menuItem).toBeInTheDocument();
  });

  it("should render an active item when href matches current pathname", () => {
    render(
      <MenuItem href={routes.trackers} icon="pi-trackers" title="Trackers123" />
    );
    const title = screen.getByText("Trackers123");
    expect(title?.classList?.value?.includes("title__active")).toBe(true);
  });

  it("should render an inactive item when href doesn't match current pathname", () => {
    mockUsePathname.mockReturnValue(routes.history);
    render(
      <MenuItem href={routes.trackers} icon="pi-trackers" title="Trackers123" />
    );
    const title = screen.getByText("Trackers123");
    expect(title?.classList?.value?.includes("title__inactive")).toBe(true);
  });

  it("should handle logout and navigate to the login route", async () => {
    const pushMock = jest.fn();
    mockUseRouter.mockReturnValue({
      push: pushMock,
    } as unknown as AppRouterInstance);

    render(<MenuItem isLogout icon="pi-power-off" title="Logout" />);
    const menuItem = screen.getByTestId("menu-item");

    fireEvent.click(menuItem);

    expect(logout).toHaveBeenCalled();

    waitFor(() => expect(pushMock).toHaveBeenCalledWith(routes.login));
  });
});
