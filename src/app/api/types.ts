import type { DecodedIdToken } from "firebase-admin/auth";

type LoginProps = {
  idToken: string;
};

type Tracker = {
  id: string;
  uid: string;
  description: string;
  createdAt: string;
  stoppedAt?: string;
  timeLogged: number;
};

type TrackerDTO = Pick<Tracker, "description" | "createdAt">;

type Session = DecodedIdToken;

export type { Tracker, TrackerDTO, Session, LoginProps };
