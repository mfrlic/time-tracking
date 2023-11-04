"use client";

import { DataTable } from "primereact/datatable";
import type { Tracker, TrackerDTO } from "@/app/api/types";
import { Column } from "primereact/column";
import type { MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteTracker, updateTracker } from "../../api/client";
import { formatTimeLogged } from "@/utils/formatters";
import Actions from "../../../components/Tracker/Table/TrackerActions";
import EditTracker from "@/components/Tracker/EditTracker";
import TrackerToolbar from "@/components/Tracker/Table/TrackerToolbar";
import dayjs from "dayjs";
import useTrackers from "@/hooks/useTrackers";
import useTimerSync from "@/hooks/useTimerSync";

export default function TrackersTable() {
  const toast = useRef<Toast>(null);

  const [activeTracker, setActiveTracker] = useState<Tracker | null>(null);

  const [editingTracker, setEditingTracker] = useState<
    Tracker | TrackerDTO | null
  >(null);

  const { trackers: activeTrackers } = useTrackers("active");

  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
    tracker: Tracker
  ) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () =>
        deleteTracker(tracker.idTracker).then(() =>
          toast.current?.show({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 3000,
          })
        ),
    });
  };

  const handleAdd = () => {
    setEditingTracker({
      createdAt: dayjs().toISOString(),
      description: "",
    });
  };

  const handleEdit = (tracker: Tracker) => {
    setEditingTracker(tracker);
  };

  const handleDialogHide = () => {
    setEditingTracker(null);
  };

  const handlePlay = (tracker: Tracker) => {
    setActiveTracker(tracker);
  };

  const handlePause = () => {
    setActiveTracker(null);
  };

  const handleStop = async (tracker: Tracker) => {
    await updateTracker({
      idTracker: tracker?.idTracker,
      stoppedAt: dayjs().toISOString(),
    });

    if (activeTracker) {
      setActiveTracker(null);
    }
  };

  const handleStopAll = async () => {
    if (activeTracker) {
      setActiveTracker(null);
    }

    await Promise.all(
      activeTrackers.map((tracker) =>
        updateTracker({
          idTracker: tracker.idTracker,
          stoppedAt: dayjs().toISOString(),
        })
      )
    );
  };

  const interval = 1000;

  const callback = useCallback(() => {
    if (activeTracker) {
      const timeLogged = (activeTracker?.timeLogged ?? 0) + interval;

      updateTracker({
        idTracker: activeTracker.idTracker,
        timeLogged,
      }).then(() => {
        setActiveTracker((prev) =>
          prev
            ? {
                ...prev,
                timeLogged,
              }
            : null
        );
      });
    }
  }, [activeTracker]);

  useTimerSync({
    activeTracker,
    interval,
    callback,
  });

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />

      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={handleDialogHide}
      />

      <TrackerToolbar
        onAdd={handleAdd}
        onStopAll={handleStopAll}
        trackersCount={activeTrackers.length}
      />

      <DataTable value={activeTrackers} paginator rows={5}>
        <Column
          header="Time logged"
          body={(data) => formatTimeLogged(data.timeLogged)}
        />
        <Column field="description" header="Description" />
        <Column
          header="Actions"
          headerStyle={{ width: "5rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={(props) => (
            <Actions
              {...props}
              activeTracker={activeTracker}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onPlay={handlePlay}
              onPause={handlePause}
              onStop={handleStop}
            />
          )}
        />
      </DataTable>
    </>
  );
}
