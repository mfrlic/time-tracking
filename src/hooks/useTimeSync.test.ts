import { renderHook } from "@testing-library/react";
import { useTimeSync } from ".";

const activeTracker = {
  idTracker: "1",
  description: "Test",
  timeLogged: 0,
  lastPlayedAt: new Date().toISOString(),
  stoppedAt: null,
  uid: "123",
  createdAt: new Date().toISOString(),
};

describe("useTimeSync", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should set up and clear an interval when an active tracker is provided", () => {
    const callback = jest.fn();
    const interval = 1000;

    const { unmount } = renderHook(() =>
      useTimeSync({ interval, onInterval: callback, trackers: [activeTracker] })
    );

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not set up an interval when there is no active tracker", () => {
    const callback = jest.fn();
    const interval = 1000;

    renderHook(() =>
      useTimeSync({ interval, onInterval: callback, trackers: [] })
    );

    jest.advanceTimersByTime(interval);
    expect(callback).not.toHaveBeenCalled();
  });
});
