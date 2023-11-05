import { renderHook, waitFor } from "@testing-library/react";
import { useSession } from ".";

jest.mock("@/app/api/client", () => ({
  getSession: jest.fn(() =>
    Promise.resolve({
      uid: "123",
    })
  ),
}));

describe("useSession", () => {
  it("should fetch and set the session", async () => {
    const { result } = renderHook(() => useSession());

    expect(result.current.session).toBe(null);

    await waitFor(() =>
      expect(result.current.session).toEqual({
        uid: "123",
      })
    );
  });
});
