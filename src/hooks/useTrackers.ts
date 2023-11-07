import type { Tracker, TrackerData } from "@/app/api/types";
import { firestore } from "@/lib/firebase";
import {
  FIREBASE_TRACKERS_COLLECTION,
  // SYNC_INTERVAL,
  // SYNC_INTERVAL_OFFSET,
} from "@/utils/constants";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useSession } from ".";

export default function useTrackers(type: "history" | "active") {
  const [trackers, setTrackers] = useState<Tracker[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const { session } = useSession();

  const updateTimeLogged = (trackers: Tracker[]) => {
    return trackers.map((tracker) => {
      const dateNow = Date.now();

      if (tracker.lastPlayedAt) {
        if (tracker?.lastRefreshedAt) {
          const toBeAdded = dateNow - tracker.lastRefreshedAt;

          tracker.timeLogged += toBeAdded;
        } else {
          const toBeAdded = dateNow - tracker.lastPlayedAt;

          tracker.timeLogged += toBeAdded;
        }
      }

      tracker.lastRefreshedAt = dateNow;

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
    if (!session?.uid) return;

    // rule on firebase prevents user from seeing other users' trackers (by uid)
    const q = query(
      collection(firestore, FIREBASE_TRACKERS_COLLECTION),
      where("uid", "==", session?.uid),
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
            createdAt: data.createdAt.toDate().getTime(),
            stoppedAt: data.stoppedAt?.toDate()?.getTime(),
            lastPlayedAt: data.lastPlayedAt?.toDate()?.getTime(),
            shareCode: data.shareCode,
          };

          updatedData.push(tracker);
        }
      );

      const sortedData = updatedData.sort((a, b) =>
        b.createdAt > a.createdAt ? 1 : -1
      );

      const updatedTrackers = updateTimeLogged(sortedData);

      setTrackers(
        updatedTrackers.map((tracker) => ({
          ...tracker,
          lastRefreshedAt: Date.now(),
        }))
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, [type, session?.uid]);

  return { trackers: trackers ?? [], loading, setTimeLogged };
}
