import { routes, apiRoutes } from "./routes";
import { LOGO_URL } from "./assets";
import { FIREBASE_TRACKERS_COLLECTION } from "./firebase";
import {
  TRACKER_DELETED_MESSAGE,
  TRACKER_CREATED_MESSAGE,
  TRACKER_UPDATED_MESSAGE,
  SHARE_LINK_COPIED_MESSAGE,
  TRACKER_DELETE_POPUP_MESSAGE,
} from "./messages";
import { SESSION_COOKIE_NAME, SESSION_EXPIRES_IN } from "./cookies";

const SYNC_INTERVAL = 100; // how often to sync time on client (ms)
const SYNC_INTERVAL_OFFSET = 30; // allowed offset for syncing time on client (ms)

export {
  routes,
  apiRoutes,
  LOGO_URL,
  FIREBASE_TRACKERS_COLLECTION,
  TRACKER_DELETED_MESSAGE,
  TRACKER_CREATED_MESSAGE,
  TRACKER_UPDATED_MESSAGE,
  SHARE_LINK_COPIED_MESSAGE,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRES_IN,
  TRACKER_DELETE_POPUP_MESSAGE,
  SYNC_INTERVAL,
  SYNC_INTERVAL_OFFSET,
};
