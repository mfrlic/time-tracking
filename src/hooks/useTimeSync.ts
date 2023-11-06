import { Tracker } from "@/app/api/types";
import { useEffect } from "react";

export default function useTimeSync({
  interval,
  onInterval,
  trackers,
}: {
  interval: number;
  onInterval: () => void;
  trackers: Tracker[];
}) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (trackers?.find((tracker) => tracker.lastPlayedAt)) {
      intervalId = setInterval(() => onInterval(), interval);
    }

    return () => (intervalId ? clearInterval(intervalId) : undefined);
  }, [onInterval, interval, trackers]);
}
