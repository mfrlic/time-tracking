import type { Tracker } from "@/app/api/types";
import { firestore } from "@/lib/firebase";
import { FIREBASE_TRACKERS_COLLECTION } from "@/utils/constants";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSession from "./useSession";

export default function useTrackers(type: "history" | "active") {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { session } = useSession();

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
      setLoading(true);
      const updatedData: Tracker[] = [];

      snapshot.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const tracker: Tracker = {
            idTracker: doc.id,
            uid: doc.data().uid,
            description: doc.data().description,
            timeLogged: doc.data().timeLogged,
            createdAt: doc.data().createdAt.toDate(),
            stoppedAt: doc.data().stoppedAt?.toDate(),
          };

          updatedData.push(tracker);
        }
      );

      setTrackers(updatedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [type, session?.uid]);

  return { trackers, loading };
}
