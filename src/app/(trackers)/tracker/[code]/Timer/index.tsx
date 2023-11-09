"use client";

import { useTimeSync, useTracker } from "@/hooks";
import { formatTimeLogged } from "@/utils/formatters";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "./Timer.module.scss";
import { useEffect } from "react";

export default function Timer({ idTracker }: { idTracker: string }) {
  const { tracker, loading, setTimeLogged } = useTracker(idTracker);

  useTimeSync({
    onInterval: setTimeLogged,
    trackers: tracker ? [tracker] : [],
  });

  useEffect(() => {
    if (tracker?.timeLogged)
      document.title = `${tracker?.description} - ${formatTimeLogged(
        tracker?.timeLogged
      )} [devōt - Tracking tool]`;
  }, [tracker?.timeLogged, tracker?.description]);

  return (
    <div className={styles.root} data-testid="timer">
      {loading ? <ProgressSpinner /> : formatTimeLogged(tracker?.timeLogged)}
    </div>
  );
}
