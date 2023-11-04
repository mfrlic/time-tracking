"use client";

import { DataTable } from "primereact/datatable";
import type { Tracker } from "@/app/api/types";
import { Column } from "primereact/column";
import dayjs from "dayjs";
import { formatDateTime, formatTimeLogged } from "@/utils/formatters";
import Filters from "@/components/Tracker/Table/TrackerFilters";
import TrackerActions from "@/components/Tracker/Table/TrackerActions";
import { useState } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import EditTracker from "@/components/Tracker/EditTracker";
import useTrackers from "@/hooks/useTrackers";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function HistoryTable() {
  const { trackers: allTrackers } = useTrackers("history");

  const [filteredTrackers, setFilteredTrackers] = useState<Tracker[]>();

  const [editingTracker, setEditingTracker] = useState<Tracker | null>(null);

  const handleDialogHide = () => {
    setEditingTracker(null);
  };

  const handleEdit = (tracker: Tracker) => {
    setEditingTracker(tracker);
  };

  const handleDelete = async () => {
    // await deleteTracker({ idTracker: tracker.id });
    // await getActiveTrackers().then(setAllTrackers);
  };

  return (
    <>
      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={handleDialogHide}
      />
      <Filters
        allTrackers={allTrackers}
        setFilteredTrackers={setFilteredTrackers}
      />
      <DataTable value={filteredTrackers} paginator rows={5}>
        <Column
          header="Created at"
          body={(data: Tracker) => formatDateTime(data.createdAt)}
        />
        <Column field="description" header="Description" />
        <Column
          header="Time logged"
          body={(data: Tracker) => formatTimeLogged(data.timeLogged)}
        />
        <Column
          header="Actions"
          body={(props: Tracker) => (
            <TrackerActions
              {...props}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        />
      </DataTable>
    </>
  );
}
