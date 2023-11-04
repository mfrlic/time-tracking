import type { Tracker } from "@/app/api/types";
import { useEffect } from "react";

export default function useTimerSync({
  activeTracker,
  interval,
  callback,
}: {
  activeTracker: Tracker | null;
  interval: number;
  callback: () => void;
}) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (activeTracker) {
      intervalId = setInterval(() => callback(), interval);
    }

    return () => clearInterval(intervalId);
  }, [activeTracker, callback, interval]);
}
