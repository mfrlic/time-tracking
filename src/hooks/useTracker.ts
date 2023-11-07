import type { Tracker, TrackerData } from "@/app/api/types";
import { firestore } from "@/lib/firebase";
import { FIREBASE_TRACKERS_COLLECTION } from "@/utils/constants";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export default function useTracker(idTracker: string) {
  const [tracker, setTracker] = useState<Tracker>();
  const [loading, setLoading] = useState<boolean>(true);

  const updateTimeLogged = (t: Tracker) => {
    const dateNow = Date.now();

    if (t.lastPlayedAt) {
      t.timeLogged += dateNow - (t.lastRefreshedAt ?? t.lastPlayedAt);
    }

    t.lastRefreshedAt = dateNow;

    return t;
  };

  const setTimeLogged = useCallback(() => {
    setTracker((prevTracker) => {
      if (!prevTracker) {
        return prevTracker;
      }

      return { ...updateTimeLogged(prevTracker) };
    });
  }, []);

  useEffect(() => {
    if (!idTracker) return;

    const q = doc(
      collection(firestore, FIREBASE_TRACKERS_COLLECTION),
      idTracker
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docData = snapshot?.data() as TrackerData;

      if (!docData) return;

      const data: Tracker = {
        idTracker,
        uid: docData.uid,
        description: docData.description,
        timeLogged: docData.timeLogged,
        createdAt: docData.createdAt.toDate()?.getTime(),
        stoppedAt: docData.stoppedAt?.toDate()?.getTime(),
        lastPlayedAt: docData.lastPlayedAt?.toDate()?.getTime(),
        shareCode: docData.shareCode,
      };

      const updatedData = updateTimeLogged(data);

      setTracker({ ...updatedData, lastRefreshedAt: Date.now() });

      setLoading(false);
    });

    return () => unsubscribe();
  }, [idTracker]);

  return { tracker, loading, setTimeLogged };
}
