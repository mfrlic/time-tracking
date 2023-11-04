import type {
  ServiceAccount} from "firebase-admin/app";
import {
  initializeApp,
  getApps,
  cert
} from "firebase-admin/app";

import firebaseSecret from "./firebase-secret.json";

const credential = cert(firebaseSecret as ServiceAccount);

export function initApp() {
  if (getApps().length <= 0) {
    initializeApp({
      credential,
    });
  }
}
