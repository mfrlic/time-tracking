import type { Tracker } from "@/app/api/types";
import { firestore } from "@/lib/firebase";
import { FIREBASE_TRACKERS_COLLECTION } from "@/utils/constants";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

export default function useTracker(idTracker: string) {
  const [tracker, setTracker] = useState<Tracker>();
  const [loading, setLoading] = useState<boolean>(true);

  const updateTimeLogged = (t: Tracker) => {
    const dateNow = dayjs();

    if (t.lastPlayedAt) {
      const lastUpdateDate = dayjs(t.lastRefreshedAt ?? t.lastPlayedAt);

      t.timeLogged += dateNow.diff(lastUpdateDate, "milliseconds");
    }

    t.lastRefreshedAt = dateNow.toISOString();

    return t;
  };

  const setTimeLogged = useCallback(() => {
    setTracker((prevTracker) => {
      if (!prevTracker) {
        return prevTracker;
      }

      return updateTimeLogged(prevTracker);
    });
  }, []);

  useEffect(() => {
    if (!idTracker) return;

    const q = doc(
      collection(firestore, FIREBASE_TRACKERS_COLLECTION),
      idTracker
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docData = snapshot?.data();

      if (!docData) return;

      const data: Tracker = {
        idTracker,
        uid: docData.uid,
        description: docData.description,
        timeLogged: docData.timeLogged,
        createdAt: docData.createdAt.toDate()?.toISOString(),
        stoppedAt: docData.stoppedAt?.toDate()?.toISOString(),
        lastPlayedAt: docData.lastPlayedAt?.toDate()?.toISOString(),
        shareCode: docData.shareCode,
      };

      const updatedData = updateTimeLogged(data);

      setTracker((prev) => ({
        ...updatedData,
        lastRefreshedAt: prev?.lastRefreshedAt,
      }));

      setLoading(false);
    });

    return () => unsubscribe();
  }, [idTracker]);

  return { tracker, loading, setTimeLogged };
}
