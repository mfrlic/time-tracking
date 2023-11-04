import HistoryTable from "./HistoryTable";
import PageTitle from "@/components/PageTitle";
import styles from "../Trackers.module.scss";

export default async function HistoryPage() {
  return (
    <main className={styles.root}>
      <PageTitle title="Trackers History" />

      <HistoryTable />
    </main>
  );
}
