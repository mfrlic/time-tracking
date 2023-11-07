import { renderHook } from "@testing-library/react";
import { useTimeSync } from ".";
import { SYNC_INTERVAL } from "@/utils/constants";

const activeTracker = {
  idTracker: "1",
  description: "Test",
  timeLogged: 0,
  lastPlayedAt: Date.now(),
  stoppedAt: null,
  uid: "123",
  createdAt: Date.now(),
};

describe("useTimeSync", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should set up and clear an interval when an active tracker is provided", () => {
    const callback = jest.fn();

    const { unmount } = renderHook(() =>
      useTimeSync({ onInterval: callback, trackers: [activeTracker] })
    );

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(SYNC_INTERVAL);
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    jest.advanceTimersByTime(SYNC_INTERVAL);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not set up an interval when there is no active tracker", () => {
    const callback = jest.fn();

    renderHook(() => useTimeSync({ onInterval: callback, trackers: [] }));

    jest.advanceTimersByTime(SYNC_INTERVAL);
    expect(callback).not.toHaveBeenCalled();
  });
});
