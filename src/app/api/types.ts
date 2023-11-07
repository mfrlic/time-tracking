import type { DecodedIdToken } from "firebase-admin/auth";
import type { Timestamp } from "firebase/firestore";

type LoginProps = {
  idToken: string;
};

type Tracker = {
  idTracker: string;
  uid: string;
  description: string;
  createdAt: string;
  stoppedAt?: string | null;
  lastPlayedAt?: string | null;
  lastRefreshedAt?: string; // only used in client
  timeLogged: number;
  shareCode?: string;
};

type TrackerData = Omit<
  Tracker,
  "idTracker" | "lastRefreshedAt" | "createdAt" | "stoppedAt" | "lastPlayedAt"
> & {
  createdAt: Timestamp;
  stoppedAt?: Timestamp | null;
  lastPlayedAt?: Timestamp | null;
};

type UpdateTrackerProps = {
  description?: string;
  idTracker: string;
  stoppedAt?: string;
  timeLogged?: number;
  lastPlayedAt?: string | null;
  shareCode?: string;
};

type CreateTrackerProps = Pick<Tracker, "description" | "createdAt">;

type Session = DecodedIdToken;

export type {
  Tracker,
  TrackerData,
  UpdateTrackerProps,
  CreateTrackerProps,
  Session,
  LoginProps,
};
