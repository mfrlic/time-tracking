import type { Tracker, TrackerData } from "@/app/api/types";
import { firestore } from "@/lib/firebase";
import { FIREBASE_TRACKERS_COLLECTION } from "@/utils/constants";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

export default function useTrackers(type: "history" | "active") {
  const [trackers, setTrackers] = useState<Tracker[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const updateTimeLogged = (trackers: Tracker[]) => {
    return trackers.map((tracker) => {
      const dateNow = dayjs();

      if (tracker.lastPlayedAt) {
        const lastUpdateDate = dayjs(
          tracker.lastRefreshedAt ?? tracker.lastPlayedAt
        );

        tracker.timeLogged += dateNow.diff(lastUpdateDate, "milliseconds");
      }

      tracker.lastRefreshedAt = dateNow.toISOString();

      return tracker;
    });
  };

  const setTimeLogged = useCallback(() => {
    setTrackers((prevTrackers) => {
      if (!prevTrackers) {
        return prevTrackers;
      }

      return updateTimeLogged(prevTrackers);
    });
  }, []);

  useEffect(() => {
    // rule on firebase prevents user from seeing other users' trackers

    const q = query(
      collection(firestore, FIREBASE_TRACKERS_COLLECTION),
      where("stoppedAt", type === "history" ? "!=" : "==", null)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData: Tracker[] = [];

      snapshot.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const data = doc.data() as TrackerData;
          const tracker: Tracker = {
            idTracker: doc.id,
            uid: data.uid,
            description: data.description,
            timeLogged: data.timeLogged,
            createdAt: data.createdAt.toDate()?.toISOString(),
            stoppedAt: data.stoppedAt?.toDate()?.toISOString(),
            lastPlayedAt: data.lastPlayedAt?.toDate()?.toISOString(),
            shareCode: data.shareCode,
          };

          updatedData.push(tracker);
        }
      );

      const sortedData = updatedData.sort((a, b) =>
        dayjs(b.createdAt).isAfter(a.createdAt) ? 1 : -1
      );

      const updatedTrackers = updateTimeLogged(sortedData);

      setTrackers(
        updatedTrackers.map((tracker) => ({
          ...tracker,
          lastRefreshedAt: dayjs().toISOString(),
        }))
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, [type]);

  return { trackers: trackers ?? [], loading, setTimeLogged };
}
