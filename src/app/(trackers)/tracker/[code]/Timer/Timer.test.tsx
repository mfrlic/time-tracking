import { render } from "@testing-library/react";
import Timer from ".";
import type { Tracker } from "@/app/api/types";

const interval = 1000;

//FIXME: doesn't pass

describe("Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should increment time if playing", () => {
    const activeTracker: Tracker = {
      idTracker: "1",
      description: "Test",
      timeLogged: 0,
      lastPlayedAt: null,
      stoppedAt: null,
      uid: "123",
      createdAt: new Date().toISOString(),
      lastRefreshedAt: undefined,
    };

    jest.mock("@/hooks/useTracker", () =>
      jest.fn(() => ({
        tracker: activeTracker,
        loading: false,
        setTimeLogged: jest.fn(),
      }))
    );

    const { container } = render(<Timer idTracker={activeTracker.idTracker} />);

    jest.advanceTimersByTime(interval);

    expect(container.querySelector("div")).toHaveTextContent("00:00:01");
  });

  it("should not increment time if playing", () => {
    const activeTracker: Tracker = {
      idTracker: "1",
      description: "Test",
      timeLogged: 0,
      lastPlayedAt: null,
      stoppedAt: null,
      uid: "123",
      createdAt: new Date().toISOString(),
      lastRefreshedAt: undefined,
    };

    jest.mock("@/hooks/useTracker", () =>
      jest.fn(() => ({
        tracker: activeTracker,
        loading: false,
        setTimeLogged: jest.fn(),
      }))
    );

    const { container } = render(<Timer idTracker={activeTracker.idTracker} />);

    jest.advanceTimersByTime(interval);
    expect(activeTracker.lastRefreshedAt).toBeUndefined();

    expect(container.querySelector("div")).toHaveTextContent("00:00:00");
  });
});
