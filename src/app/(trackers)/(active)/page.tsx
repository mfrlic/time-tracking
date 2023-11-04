import dayjs from "dayjs";
import TrackersTable from "./TrackersTable";
import PageTitle from "@/components/PageTitle";
import styles from "../Trackers.module.scss";

export default async function TrackersPage() {
  const title = `Today (${dayjs().format("DD.MM.YYYY.")})`;

  return (
    <main className={styles.root}>
      <PageTitle title={title} icon="calendar" />

      <TrackersTable />
    </main>
  );
}
