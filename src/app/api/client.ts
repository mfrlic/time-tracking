import { auth, firestore } from "@/lib/firebase";
import { apiRoutes } from "@/utils/constants";
import type { LoginProps, Session } from "@/app/api/types";
import { signOut } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function login({ idToken }: LoginProps): Promise<true> {
  return fetch(apiRoutes.login, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }).then((res) => res.json());
}

function getSession(
  origin?: string,
  init?: RequestInit
): Promise<Session | null> {
  return fetch(`${origin ?? ""}${apiRoutes.session}`, init).then((res) =>
    res.json()
  );
}

async function logout(): Promise<true> {
  await signOut(auth);

  return fetch(apiRoutes.logout, {
    method: "POST",
  }).then((res) => res.json());
}

async function createTracker({ description }: { description: string }) {
  addDoc(collection(firestore, "timers"), {
    createdAt: new Timestamp(new Date().getTime() / 1000, 0),
    description,
    uid: auth.currentUser?.uid,
    timeLogged: 0,
    stoppedAt: null,
  });
}

async function updateTracker({
  idTracker,
  description,
  stoppedAt,
  timeLogged,
}: {
  description?: string;
  idTracker: string;
  stoppedAt?: string;
  timeLogged?: number;
}) {
  const ref = doc(firestore, "timers", idTracker);

  const toUpdate: {
    description?: string;
    stoppedAt?: Timestamp;
    timeLogged?: number;
  } = {};

  if (description) {
    toUpdate["description"] = description;
  }

  if (stoppedAt) {
    toUpdate["stoppedAt"] = new Timestamp(
      new Date(stoppedAt).getTime() / 1000,
      0
    );
  }

  if (timeLogged) {
    toUpdate["timeLogged"] = timeLogged;
  }

  console.log(toUpdate);

  updateDoc(ref, toUpdate);
}

async function deleteTracker(idTracker: string) {
  const ref = doc(firestore, "timers", idTracker);

  await deleteDoc(ref);
}

export {
  login,
  getSession,
  logout,
  createTracker,
  updateTracker,
  deleteTracker,
};
