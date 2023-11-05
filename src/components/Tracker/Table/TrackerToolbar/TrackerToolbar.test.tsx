import { render, fireEvent, screen } from "@testing-library/react";
import TrackerToolbar from ".";

const onStopAll = jest.fn();
const onAdd = jest.fn();

describe("TrackerToolbar", () => {
  it("should render the TrackerToolbar component", () => {
    const trackersCount = 0;
    render(
      <TrackerToolbar
        onStopAll={onStopAll}
        onAdd={onAdd}
        trackersCount={trackersCount}
      />
    );

    expect(screen.getByLabelText("Start a new timer")).toBeInTheDocument();
    expect(screen.getByLabelText("Stop all")).toBeInTheDocument();
  });

  it('should call the onAdd function when "Start a new timer" button is clicked', () => {
    const trackersCount = 0;
    render(
      <TrackerToolbar
        onStopAll={onStopAll}
        onAdd={onAdd}
        trackersCount={trackersCount}
      />
    );

    fireEvent.click(screen.getByLabelText("Start a new timer"));

    expect(onAdd).toHaveBeenCalled();
  });

  it('should call the onStopAll function when "Stop all" button is clicked (assuming there is at least one tracker)', () => {
    const trackersCount = 2;
    render(
      <TrackerToolbar
        onStopAll={onStopAll}
        onAdd={onAdd}
        trackersCount={trackersCount}
      />
    );

    fireEvent.click(screen.getByLabelText("Stop all"));

    expect(onStopAll).toHaveBeenCalled();
  });

  it('should disable the "Stop all" button when there are no trackers', () => {
    const trackersCount = 0;
    render(
      <TrackerToolbar
        onStopAll={onStopAll}
        onAdd={onAdd}
        trackersCount={trackersCount}
      />
    );

    expect(screen.getByLabelText("Stop all")).toBeDisabled();
  });

  it('should enable the "Stop all" button when there are trackers', () => {
    const onStopAll = jest.fn();
    const onAdd = jest.fn();
    const trackersCount = 2;
    render(
      <TrackerToolbar
        onStopAll={onStopAll}
        onAdd={onAdd}
        trackersCount={trackersCount}
      />
    );

    expect(screen.getByLabelText("Stop all")).not.toBeDisabled();
  });
});
