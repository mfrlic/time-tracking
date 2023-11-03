"use client";

import { auth, firestore } from "@/lib/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";

export default function ClientPage() {
  useEffect(() => {
    console.log(auth.currentUser);
    if (!auth.currentUser) return;

    const timersCollection = collection(firestore, "timers");

    const timersQuery = query(
      timersCollection,
      where("idUser", "==", auth.currentUser?.uid),
      orderBy("endedAt", "desc"),
      limit(10)
    );

    getDocs(timersQuery).then((data) => {
      console.log(data);
    });
  }, []);

  return <main>Client</main>;
}
