import type { Tracker } from "@/app/api/types";
import { firestore } from "@/lib/firebase";
import { FIREBASE_TRACKERS_COLLECTION } from "@/utils/constants";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import useSession from "./useSession";
import dayjs from "dayjs";

export default function useTrackers(type: "history" | "active") {
  const [trackers, setTrackers] = useState<Tracker[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const { session } = useSession();

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
    if (!session?.uid) {
      return;
    }

    const q = query(
      collection(firestore, FIREBASE_TRACKERS_COLLECTION),
      where("uid", "==", session.uid),
      where("stoppedAt", type === "history" ? "!=" : "==", null)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData: Tracker[] = [];

      snapshot.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const tracker: Tracker = {
            idTracker: doc.id,
            uid: doc.data().uid,
            description: doc.data().description,
            timeLogged: doc.data().timeLogged,
            createdAt: doc.data().createdAt.toDate()?.toISOString(),
            stoppedAt: doc.data().stoppedAt?.toDate()?.toISOString(),
            lastPlayedAt: doc.data().lastPlayedAt?.toDate()?.toISOString(),
            shareCode: doc.data().shareCode,
          };

          updatedData.push(tracker);
        }
      );

      const sortedData = updatedData.sort((a, b) =>
        dayjs(b.createdAt).isAfter(a.createdAt) ? 1 : -1
      );

      const updatedTrackers = updateTimeLogged(sortedData);

      setTrackers((prev) =>
        updatedTrackers.map((tracker) => ({
          ...tracker,
          lastRefreshedAt: prev?.find(
            (prevTracker) => prevTracker.idTracker === tracker.idTracker
          )?.lastRefreshedAt,
        }))
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, [type, session?.uid]);

  return { trackers: trackers ?? [], loading, setTimeLogged };
}
