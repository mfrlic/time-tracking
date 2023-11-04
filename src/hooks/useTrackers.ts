import type { Tracker } from "@/app/api/types";
import { firestore } from "@/lib/firebase";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useTrackers(type: "history" | "active") {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //   const uid = auth.currentUser;
    // console.log(auth.currentUser);
    // if (!uid) return;

    const q = query(
      collection(firestore, "timers"),
      //   where("uid", "==", uid),
      where("stoppedAt", type === "history" ? "!=" : "==", null)
      //   orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLoading(true);
      const updatedData: Tracker[] = [];

      snapshot.forEach(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const tracker: Tracker = {
            id: doc.id,
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
  }, [type]);

  return { trackers, loading };
}
