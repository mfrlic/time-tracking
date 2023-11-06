import { auth, firestore } from "@/lib/firebase";
import { FIREBASE_TRACKERS_COLLECTION, apiRoutes } from "@/utils/constants";
import type { LoginProps, Session, UpdateTrackerProps } from "@/app/api/types";
import { signOut } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function login({ idToken }: LoginProps): Promise<boolean> {
  try {
    return fetch(apiRoutes.login, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json());
  } catch {
    return Promise.resolve(false);
  }
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

async function createTracker({
  description,
  lastPlayedAt,
}: {
  description: string;
  lastPlayedAt: string;
}) {
  addDoc(collection(firestore, FIREBASE_TRACKERS_COLLECTION), {
    createdAt: new Timestamp(new Date().getTime() / 1000, 0),
    description,
    uid: auth.currentUser?.uid,
    timeLogged: 0,
    stoppedAt: null,
    lastPlayedAt: new Timestamp(new Date(lastPlayedAt).getTime() / 1000, 0),
  });
}

async function updateTracker({
  idTracker,
  description,
  stoppedAt,
  timeLogged,
  lastPlayedAt,
  shareCode,
}: UpdateTrackerProps) {
  const ref = doc(firestore, FIREBASE_TRACKERS_COLLECTION, idTracker);

  const toUpdate: Omit<
    UpdateTrackerProps,
    "idTracker" | "stoppedAt" | "lastPlayedAt"
  > & {
    stoppedAt?: Timestamp;
    lastPlayedAt?: Timestamp | null;
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

  if (lastPlayedAt !== undefined) {
    toUpdate["lastPlayedAt"] = lastPlayedAt
      ? new Timestamp(new Date(lastPlayedAt).getTime() / 1000, 0)
      : null;
  }

  if (shareCode) {
    toUpdate["shareCode"] = shareCode;
  }

  updateDoc(ref, toUpdate);
}

async function deleteTracker(idTracker: string) {
  const ref = doc(firestore, FIREBASE_TRACKERS_COLLECTION, idTracker);

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
