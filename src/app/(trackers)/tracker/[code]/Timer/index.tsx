"use client";

import { useTimeSync, useTracker } from "@/hooks";
import { formatTimeLogged } from "@/utils/formatters";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "./Timer.module.scss";

export default function Timer({ idTracker }: { idTracker: string }) {
  const { tracker, loading, setTimeLogged } = useTracker(idTracker);

  useTimeSync({
    interval: 1000,
    onInterval: () => {
      document.title = `${tracker?.description} - ${formatTimeLogged(
        tracker?.timeLogged
      )} [devōt - Tracking tool]`;

      setTimeLogged();
    },
    trackers: tracker ? [tracker] : [],
  });

  return (
    <div className={styles.root} data-testid="timer">
      {loading ? <ProgressSpinner /> : formatTimeLogged(tracker?.timeLogged)}
    </div>
  );
}
