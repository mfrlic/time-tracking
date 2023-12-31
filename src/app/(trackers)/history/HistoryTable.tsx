"use client";

import { DataTable } from "primereact/datatable";
import type { Tracker } from "@/app/api/types";
import { Column } from "primereact/column";
import dayjs from "dayjs";
import { formatDateTime, formatTimeLogged } from "@/utils/formatters";
import TrackerActions from "@/components/Tracker/Table/TrackerActions";
import { useCallback, useEffect, useRef, useState } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import EditTracker from "@/components/Tracker/EditTracker";
import { useTrackers } from "@/hooks";
import TrackerFilters from "@/components/Tracker/Table/TrackerFilters";
import type { TrackerFilters as TrackerFiltersType } from "@/components/Tracker/types";
import { normalizedSearch } from "@/utils/functions";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteTracker } from "@/app/api/client";
import { Toast } from "primereact/toast";
import {
  TRACKER_DELETED_MESSAGE,
  TRACKER_DELETE_POPUP_MESSAGE,
} from "@/utils/constants";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function HistoryTable() {
  const toast = useRef<Toast>(null);
  const { trackers: allTrackers, loading } = useTrackers("history");

  const [filters, setFilters] = useState<TrackerFiltersType>({
    searchTerm: "",
    dateFrom: null,
    dateTo: null,
  });

  const [filteredTrackers, setFilteredTrackers] = useState<Tracker[]>();
  const [editingTracker, setEditingTracker] = useState<Tracker | null>(null);

  const filterResults = useCallback(
    (filters: TrackerFiltersType) => {
      const filteredTrackers = allTrackers.filter((tracker) => {
        const searchTermMatch = filters.searchTerm
          ? normalizedSearch(filters.searchTerm, tracker.description)
          : true;

        const dateFromMatch = filters.dateFrom
          ? dayjs(tracker.createdAt).isSameOrAfter(dayjs(filters.dateFrom))
          : true;

        const dateToMatch = filters.dateTo
          ? dayjs(tracker.createdAt).isSameOrBefore(
              dayjs(filters.dateTo)
                .set("hour", 23)
                .set("minute", 59)
                .set("second", 59)
            )
          : true;

        return searchTermMatch && dateFromMatch && dateToMatch;
      });

      setFilteredTrackers(filteredTrackers);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(allTrackers)]
  );

  useEffect(() => {
    filterResults(filters);
  }, [filters, filterResults]);

  const handleDialogHide = () => {
    setEditingTracker(null);
  };

  const handleEdit = (tracker: Tracker) => {
    setEditingTracker(tracker);
  };

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

  const handleFiltersChange = (f: TrackerFiltersType) => {
    setFilters(f);
    filterResults(f);
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={handleDialogHide}
      />
      <TrackerFilters filters={filters} onFiltersChange={handleFiltersChange} />
      <DataTable value={filteredTrackers} paginator rows={5} loading={loading}>
        <Column
          header="Created at"
          body={(data: Tracker) => formatDateTime(data.createdAt)}
        />
        <Column
          field="description"
          header="Description"
          style={{
            width: "40%",
          }}
        />
        <Column
          header="Time logged"
          body={(data: Tracker) => formatTimeLogged(data.timeLogged)}
        />
        <Column
          header="Actions"
          body={(tracker: Tracker) => (
            <TrackerActions
              tracker={tracker}
              onEdit={handleEdit}
              onDelete={handleDelete}
              toast={toast.current}
            />
          )}
        />
      </DataTable>
    </>
  );
}
