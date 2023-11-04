import clsx from "clsx";
import dayjs from "dayjs";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import type { ChangeEvent, SyntheticEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import styles from "./TrackerFilters.module.scss";
import type { FormEvent } from "primereact/ts-helpers";
import type { Tracker } from "../../../../app/api/types";
import { normalizedSearch } from "@/utils";
import FilterContainer from "./TrackerFilterContainer";
import type { TrackerFilters } from "../../types";

const DATE_FROM_ID = "cal-from";
const DATE_TO_ID = "cal-to";
const SEARCH_ID = "input-search";

export default function TrackerFilters({
  allTrackers,
  setFilteredTrackers,
}: {
  allTrackers: Tracker[];
  setFilteredTrackers: (trackers: Tracker[]) => void;
}) {
  const formatDate = (date: Date) => {
    return dayjs(date).format("DD.MM.YYYY.");
  };

  const [filters, setFilters] = useState<TrackerFilters>({
    dateFrom: null,
    dateTo: null,
    searchTerm: "",
  });

  const filterResults = useCallback(
    (filters: TrackerFilters) => {
      const filteredTrackers = allTrackers.filter((tracker) => {
        const searchTermMatch = filters.searchTerm
          ? normalizedSearch(filters.searchTerm, tracker.description)
          : true;

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

  // update filtered trackers when all trackers change
  useMemo(() => {
    filterResults(filters);
  }, [filterResults, filters]);

  const handleFiltersChange = (
    event:
      | FormEvent<Date, SyntheticEvent<Element, Event>>
      | ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);

    filterResults(newFilters);
  };

  const handleSearchClear = () => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: "",
    }));
  };

  return (
    <div className={styles.root}>
      <FilterContainer htmlFor={DATE_FROM_ID} label="Date from">
        <Calendar
          inputId={DATE_FROM_ID}
          name="from"
          value={filters.dateFrom ? new Date(filters.dateFrom) : null}
          onChange={handleFiltersChange}
          maxDate={filters.dateTo ? new Date(filters.dateTo) : undefined}
          formatDateTime={formatDate}
          showIcon
        />
      </FilterContainer>

      <FilterContainer htmlFor={DATE_TO_ID} label="Date to">
        <Calendar
          inputId={DATE_TO_ID}
          name="to"
          value={filters.dateTo ? new Date(filters.dateTo) : null}
          onChange={handleFiltersChange}
          minDate={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
          formatDateTime={formatDate}
          showIcon
        />
      </FilterContainer>

      <FilterContainer htmlFor={SEARCH_ID} label="Search">
        <span className="p-input-icon-right">
          <InputText
            id={SEARCH_ID}
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFiltersChange}
            className={styles.search__input}
          />
          {filters?.searchTerm ? (
            <i
              onClick={handleSearchClear}
              className={clsx("pi", "pi-times", styles.search__icon)}
            />
          ) : null}
        </span>
      </FilterContainer>
    </div>
  );
}
