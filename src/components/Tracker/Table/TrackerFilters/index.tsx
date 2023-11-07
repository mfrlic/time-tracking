import clsx from "clsx";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import styles from "./TrackerFilters.module.scss";
import type { FormEvent } from "primereact/ts-helpers";
import FilterContainer from "./TrackerFilterContainer";
import type { TrackerFilters as TrackerFiltersType } from "../../types";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import { formatDate } from "@/utils/formatters";

const DATE_FROM_ID = "cal-from";
const DATE_TO_ID = "cal-to";
const SEARCH_ID = "input-search";

export default function TrackerFilters({
  filters,
  onFiltersChange,
}: {
  filters: TrackerFiltersType;
  onFiltersChange: (filters: TrackerFiltersType) => void;
}) {
  const handleFiltersChange = (
    event:
      | FormEvent<Date, React.SyntheticEvent<Element, Event>>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const newFilters = {
      ...filters,
      [name]: value,
    };

    onFiltersChange(newFilters);
  };

  const handleSearchClear = () => {
    onFiltersChange({ ...filters, searchTerm: "" });
  };

  return (
    <div className={styles.root}>
      <FilterContainer htmlFor={DATE_FROM_ID} label="Date from">
        <Calendar
          className={styles.calendar}
          inputId={DATE_FROM_ID}
          name="dateFrom"
          value={filters.dateFrom ? new Date(filters.dateFrom) : null}
          onChange={handleFiltersChange}
          maxDate={filters.dateTo ? new Date(filters.dateTo) : new Date()}
          formatDateTime={formatDate}
          showIcon
          icon={<CalendarIcon />}
          showButtonBar
        />
      </FilterContainer>

      <FilterContainer htmlFor={DATE_TO_ID} label="Date to">
        <Calendar
          className={styles.calendar}
          inputId={DATE_TO_ID}
          name="dateTo"
          value={filters.dateTo ? new Date(filters.dateTo) : null}
          onChange={handleFiltersChange}
          minDate={filters.dateFrom ? new Date(filters.dateFrom) : undefined}
          maxDate={new Date()}
          formatDateTime={formatDate}
          showIcon
          icon={<CalendarIcon />}
          showButtonBar
        />
      </FilterContainer>

      <FilterContainer htmlFor={SEARCH_ID} label="Search">
        <span className="p-input-icon-right">
          <InputText
            id={SEARCH_ID}
            value={filters.searchTerm}
            name="searchTerm"
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
