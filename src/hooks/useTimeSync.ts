import type { Tracker } from "@/app/api/types";
import { SYNC_INTERVAL } from "@/utils/constants";
import { useEffect } from "react";

export default function useTimeSync({
  onInterval,
  trackers,
}: {
  onInterval: () => void;
  trackers: Tracker[];
}) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (trackers?.find((tracker) => tracker.lastPlayedAt)) {
      intervalId = setInterval(() => onInterval(), SYNC_INTERVAL);
    }

    return () => (intervalId ? clearInterval(intervalId) : undefined);
  }, [onInterval, trackers]);
}
