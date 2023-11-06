import HistoryTable from "./HistoryTable";
import PageTitle from "@/components/PageTitle";
import styles from "../Trackers.module.scss";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import dayjs from "dayjs";

type HistoryPageProps = {
  searchParams: {
    dateFrom?: string;
    dateTo?: string;
    searchTerm?: string;
  };
};

const verifyDateTime = (date?: string): string | null => {
  return date && dayjs(date).isValid() ? dayjs(date).toISOString() : null;
};

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const initialFilters = {
    dateFrom: verifyDateTime(searchParams?.dateFrom),
    dateTo: verifyDateTime(searchParams?.dateTo),
    searchTerm: searchParams?.searchTerm ?? "",
  };

  return (
    <main className={styles.root}>
      <PageTitle
        title="Trackers History"
        icon={<CalendarIcon color="black" />}
      />

      <HistoryTable initialFilters={initialFilters} />
    </main>
  );
}
