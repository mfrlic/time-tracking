import { renderHook } from "@testing-library/react";
import { useTimerSync } from ".";
import type { Tracker } from "@/app/api/types";

describe("useTimerSync", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should set up and clear an interval when activeTracker is provided", () => {
    const callback = jest.fn();
    const activeTracker = {} as Tracker;
    const interval = 1000;

    const { unmount } = renderHook(() =>
      useTimerSync({ activeTracker, interval, callback })
    );

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not set up an interval when activeTracker is null", () => {
    const callback = jest.fn();
    const activeTracker = null;
    const interval = 1000;

    renderHook(() => useTimerSync({ activeTracker, interval, callback }));

    jest.advanceTimersByTime(interval);
    expect(callback).not.toHaveBeenCalled();
  });
});
