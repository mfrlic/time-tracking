import HistoryTable from "./HistoryTable";
import PageTitle from "@/components/PageTitle";
import styles from "../Trackers.module.scss";
import CalendarIcon from "@/assets/icons/CalendarIcon";

export default async function HistoryPage() {
  return (
    <main className={styles.root}>
      <PageTitle
        title="Trackers History"
        icon={<CalendarIcon color="black" />}
      />

      <HistoryTable />
    </main>
  );
}
