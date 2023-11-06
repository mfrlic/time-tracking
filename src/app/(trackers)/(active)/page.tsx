import dayjs from "dayjs";
import TrackersTable from "./TrackersTable";
import PageTitle from "@/components/PageTitle";
import styles from "../Trackers.module.scss";
import { StopwatchIcon } from "@/assets/icons";

export default async function TrackersPage() {
  return (
    <main className={styles.root}>
      <PageTitle
        title="Active trackers"
        icon={<StopwatchIcon color="black" />}
      />

      <TrackersTable />
    </main>
  );
}
