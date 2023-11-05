import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import EditTracker from ".";
import dayjs from "dayjs";
import { createTracker, updateTracker } from "@/app/api/client";

jest.mock("@/app/api/client", () => ({
  createTracker: jest.fn(() => Promise.resolve()),
  updateTracker: jest.fn(() => Promise.resolve()),
}));

describe("EditTracker", () => {
  it("should render the dialog", () => {
    const editingTracker = {
      description: "",
      createdAt: dayjs().toISOString(),
    };
    const onDialogHide = jest.fn();
    render(
      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={onDialogHide}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      editingTracker.description
    );
  });

  it("should submit the new tracker", async () => {
    const editingTracker = {
      description: "",
      createdAt: dayjs().toISOString(),
    };
    const onDialogHide = jest.fn();

    render(
      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={onDialogHide}
      />
    );

    const descriptionInput = screen.getByPlaceholderText("Description");
    const saveButton = screen.getByText("Save");

    fireEvent.change(descriptionInput, {
      target: { value: "New Tracker Description" },
    });

    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(screen.getByText("Tracker created")).toBeInTheDocument()
    );

    expect(createTracker).toHaveBeenCalledWith({
      description: "New Tracker Description",
    });

    expect(onDialogHide).toHaveBeenCalled();
  });

  it("should submit an edited tracker", async () => {
    const editingTracker = {
      idTracker: 1,
      description: "Old Description",
      uid: "abc",
      createdAt: dayjs().toISOString(),
      timeLogged: 0,
    };

    const onDialogHide = jest.fn();
    render(
      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={onDialogHide}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Updated Description" },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() =>
      expect(screen.getByText("Tracker updated")).toBeInTheDocument()
    );

    expect(updateTracker).toHaveBeenCalledWith({
      idTracker: 1,
      description: "Updated Description",
    });

    expect(onDialogHide).toHaveBeenCalled();
  });
});
