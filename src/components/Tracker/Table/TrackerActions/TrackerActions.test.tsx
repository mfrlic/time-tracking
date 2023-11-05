import { render, fireEvent, screen } from "@testing-library/react";
import Actions from ".";
import dayjs from "dayjs";

describe("Actions", () => {
  const mockData = {
    idTracker: "1",
    uid: "abc",
    description: "Tracker Description",
    createdAt: dayjs().toISOString(),
    timeLogged: 0,
  };

  it("should render the Actions component with Play", () => {
    const onPause = jest.fn();
    const onPlay = jest.fn();
    const onStop = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <Actions
        activeTracker={{ ...mockData, idTracker: "2" }} // tracker is not active
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        onDelete={onDelete}
        onEdit={onEdit}
        {...mockData}
      />
    );

    const pauseButton = screen.queryByLabelText("Pause");

    expect(screen.getByLabelText("Play")).toBeInTheDocument();
    expect(pauseButton).toBeNull();
    expect(screen.getByLabelText("Stop")).toBeInTheDocument();
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete")).toBeInTheDocument();
  });

  it("should render the Actions component with Pause", () => {
    const onPause = jest.fn();
    const onPlay = jest.fn();
    const onStop = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <Actions
        activeTracker={{ ...mockData }}
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        onDelete={onDelete}
        onEdit={onEdit}
        {...mockData}
      />
    );

    const playButton = screen.queryByLabelText("Play");

    expect(playButton).toBeNull();
    expect(screen.getByLabelText("Pause")).toBeInTheDocument();
    expect(screen.getByLabelText("Stop")).toBeInTheDocument();
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete")).toBeInTheDocument();
  });

  it("should render the Actions component without controls", () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(<Actions onDelete={onDelete} onEdit={onEdit} {...mockData} />);

    const playButton = screen.queryByLabelText("Play");
    const pauseButton = screen.queryByLabelText("Pause");
    const stopButton = screen.queryByLabelText("Stop");

    expect(playButton).toBeNull();
    expect(pauseButton).toBeNull();
    expect(stopButton).toBeNull();
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete")).toBeInTheDocument();
  });

  it("should call the onPlay function when Play button is clicked", () => {
    const onPause = jest.fn();
    const onPlay = jest.fn();
    const onStop = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <Actions
        activeTracker={{ ...mockData, idTracker: "2" }}
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        onDelete={onDelete}
        onEdit={onEdit}
        {...mockData}
      />
    );

    fireEvent.click(screen.getByLabelText("Play"));

    expect(onPlay).toHaveBeenCalledWith(mockData);
  });

  it("should call the onPause function when Pause button is clicked", () => {
    const onPause = jest.fn();
    const onPlay = jest.fn();
    const onStop = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <Actions
        activeTracker={{ ...mockData }} // tracker is active
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        onDelete={onDelete}
        onEdit={onEdit}
        {...mockData}
      />
    );

    fireEvent.click(screen.getByLabelText("Pause"));

    expect(onPause).toHaveBeenCalledWith(mockData);
  });

  it("should call the onStop function when Stop button is clicked", () => {
    const onPause = jest.fn();
    const onPlay = jest.fn();
    const onStop = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <Actions
        activeTracker={{ ...mockData }}
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        onDelete={onDelete}
        onEdit={onEdit}
        {...mockData}
      />
    );

    fireEvent.click(screen.getByLabelText("Stop"));

    expect(onStop).toHaveBeenCalledWith(mockData);
  });

  it("should call the onEdit function when Edit button is clicked", () => {
    const onPause = jest.fn();
    const onPlay = jest.fn();
    const onStop = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <Actions
        activeTracker={{ ...mockData }}
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        onDelete={onDelete}
        onEdit={onEdit}
        {...mockData}
      />
    );

    fireEvent.click(screen.getByLabelText("Edit"));

    expect(onEdit).toHaveBeenCalledWith(mockData);
  });

  it("should call the onDelete function when Delete button is clicked", () => {
    const onPause = jest.fn();
    const onPlay = jest.fn();
    const onStop = jest.fn();
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(
      <Actions
        activeTracker={{ ...mockData }}
        onPause={onPause}
        onPlay={onPlay}
        onStop={onStop}
        onDelete={onDelete}
        onEdit={onEdit}
        {...mockData}
      />
    );

    fireEvent.click(screen.getByLabelText("Delete"));

    expect(onDelete).toHaveBeenCalledWith(expect.anything(), mockData);
  });
});
