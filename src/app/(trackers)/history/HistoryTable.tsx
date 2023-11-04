"use client";

import { DataTable } from "primereact/datatable";
import type { Tracker } from "@/app/api/types";
import { Column } from "primereact/column";
import dayjs from "dayjs";
import { formatDateTime, formatTimeLogged } from "@/utils/formatters";
import TrackerActions from "@/components/Tracker/Table/TrackerActions";
import { useCallback, useEffect, useState } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import EditTracker from "@/components/Tracker/EditTracker";
import useTrackers from "@/hooks/useTrackers";
import TrackerFilters from "@/components/Tracker/Table/TrackerFilters";
import type { TrackerFilters as TrackerFiltersType } from "@/components/Tracker/types";
import { normalizedSearch } from "@/utils";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function HistoryTable() {
  const { trackers: allTrackers } = useTrackers("history");

  const [filters, setFilters] = useState<TrackerFiltersType>({
    dateFrom: null,
    dateTo: null,
    searchTerm: "",
  });

  const [filteredTrackers, setFilteredTrackers] = useState<Tracker[]>();

  const filterResults = useCallback(
    (filters: TrackerFiltersType) => {
      const filteredTrackers = allTrackers.filter((tracker) => {
        const searchTermMatch = filters.searchTerm
          ? normalizedSearch(filters.searchTerm, tracker.description)
          : true;

        console.log(filters);

        const dateFromMatch = filters.dateFrom
          ? dayjs(tracker.createdAt).isSameOrAfter(dayjs(filters.dateFrom))
          : true;

        const dateToMatch = filters.dateTo
          ? dayjs(tracker.createdAt).isSameOrBefore(dayjs(filters.dateTo))
          : true;

        return searchTermMatch && dateFromMatch && dateToMatch;
      });

      setFilteredTrackers(filteredTrackers);
    },
    [allTrackers, setFilteredTrackers]
  );

  useEffect(() => {
    filterResults(filters);
  }, [allTrackers, filters, filterResults]);

  const [editingTracker, setEditingTracker] = useState<Tracker | null>(null);

  const handleDialogHide = () => {
    setEditingTracker(null);
  };

  const handleEdit = (tracker: Tracker) => {
    setEditingTracker(tracker);
  };

  const handleDelete = async () => {
    // await deleteTracker({ idTracker: tracker.idTracker });
    // await getActiveTrackers().then(setAllTrackers);
  };

  const handleFiltersChange = useCallback(
    (filters: TrackerFiltersType) => {
      setFilters(filters);

      filterResults(filters);
    },
    [filterResults, setFilters]
  );

  return (
    <>
      <EditTracker
        editingTracker={editingTracker}
        onDialogHide={handleDialogHide}
      />
      <TrackerFilters filters={filters} onFiltersChange={handleFiltersChange} />
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
