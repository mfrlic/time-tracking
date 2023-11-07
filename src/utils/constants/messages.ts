import type { ToastMessage } from "primereact/toast";

const TRACKER_CREATED_MESSAGE: ToastMessage = {
  severity: "success",
  summary: "Success",
  detail: "Tracker created",
  life: 2000,
};

const TRACKER_UPDATED_MESSAGE: ToastMessage = {
  severity: "success",
  summary: "Success",
  detail: "Tracker updated",
  life: 2000,
};

const TRACKER_DELETE_POPUP_MESSAGE = {
  message: "Do you want to delete this record?",
  icon: "pi pi-info-circle",
  acceptClassName: "p-button-danger",
};

const TRACKER_DELETED_MESSAGE: ToastMessage = {
  severity: "success",
  summary: "Tracker deleted",
  life: 2000,
};

const SHARE_LINK_COPIED_MESSAGE: ToastMessage = {
  severity: "info",
  summary: "Share link copied to clipboard",
  life: 2000,
};

export {
  TRACKER_CREATED_MESSAGE,
  TRACKER_UPDATED_MESSAGE,
  TRACKER_DELETED_MESSAGE,
  SHARE_LINK_COPIED_MESSAGE,
  TRACKER_DELETE_POPUP_MESSAGE,
};
