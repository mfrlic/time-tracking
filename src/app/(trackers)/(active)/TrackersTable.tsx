"use client";

import { DataTable } from "primereact/datatable";
import type { Tracker, CreateTrackerProps } from "@/app/api/types";
import { Column } from "primereact/column";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteTracker, updateTracker } from "@/app/api/client";
import { formatTimeLogged } from "@/utils/formatters";
import TrackerActions from "../../../components/Tracker/Table/TrackerActions";
import EditTracker from "@/components/Tracker/EditTracker";
import TrackerToolbar from "@/components/Tracker/Table/TrackerToolbar";
import { useTimeSync, useTrackers } from "@/hooks";
import {
  TRACKER_DELETED_MESSAGE,
  TRACKER_DELETE_POPUP_MESSAGE,
} from "@/utils/constants";

export default function TrackersTable() {
  const toast = useRef<Toast>(null);

  const [editingTracker, setEditingTracker] = useState<
    Tracker | CreateTrackerProps | null
  >(null);

  const {
    trackers: activeTrackers,
    loading,
    setTimeLogged,
  } = useTrackers("active");

  useTimeSync({
    onInterval: setTimeLogged,
    trackers: activeTrackers,
  });

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    tracker: Tracker
  ) => {
    confirmPopup({
      target: event.currentTarget,
      ...TRACKER_DELETE_POPUP_MESSAGE,
      accept: () =>
        deleteTracker(tracker.idTracker).then(() =>
          toast.current?.show(TRACKER_DELETED_MESSAGE)
        ),
    });
  };

  const handleAdd = () => {
    setEditingTracker({
      createdAt: Date.now(),
      description: "",
    });
  };

  const handleEdit = (tracker: Tracker) => {
    setEditingTracker(tracker);
  };

  const handleDialogHide = () => {
    setEditingTracker(null);
  };

  const handlePlay = async (tracker: Tracker) => {
    handlePauseAll();

    await updateTracker({
      idTracker: tracker?.idTracker,
      lastPlayedAt: Date.now(),
    });
  };

  const handlePause = async (tracker: Tracker) => {
    if (!tracker.lastPlayedAt) return;

    await updateTracker({
      idTracker: tracker?.idTracker,
      lastPlayedAt: null,
      timeLogged: tracker.timeLogged,
    });
  };

  const handlePauseAll = async () => {
    await Promise.all(activeTrackers.map(handlePause));
  };

  const handleStop = async (tracker: Tracker) => {
    const additionalData = tracker.lastPlayedAt
      ? {
          lastPlayedAt: null,
          timeLogged: tracker.timeLogged,
        }
      : {};

    await updateTracker({
      idTracker: tracker?.idTracker,
      stoppedAt: Date.now(),
      ...additionalData,
    });
  };

  const handleStopAll = async () => {
    await Promise.all(activeTrackers.map(handleStop));
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />

      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={handleDialogHide}
        onPauseAll={handlePauseAll}
      />

      <TrackerToolbar
        onAdd={handleAdd}
        onStopAll={handleStopAll}
        trackersCount={activeTrackers.length}
      />

      <DataTable value={activeTrackers} paginator rows={5} loading={loading}>
        <Column
          header="Time logged"
          body={(data) => formatTimeLogged(data.timeLogged)}
        />
        <Column
          field="description"
          header="Description"
          style={{
            width: "50%",
          }}
        />
        <Column
          header="Actions"
          body={(tracker: Tracker) => (
            <TrackerActions
              tracker={tracker}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onPlay={handlePlay}
              onPause={handlePause}
              onStop={handleStop}
              toast={toast.current}
            />
          )}
        />
      </DataTable>
    </>
  );
}
