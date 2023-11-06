import type { DecodedIdToken } from "firebase-admin/auth";

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
  UpdateTrackerProps,
  CreateTrackerProps,
  Session,
  LoginProps,
};
