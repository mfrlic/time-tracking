import type { Tracker, CreateTrackerProps } from "@/app/api/types";
import { Toast } from "primereact/toast";

type EditTrackerProps = {
  editingTracker: Tracker | CreateTrackerProps | null;
  onDialogHide: () => void;
  onPauseAll?: () => Promise<void>;
};

type TrackerFormValues = {
  description: string;
};

type TrackerFilterContainerProps = React.PropsWithChildren<{
  htmlFor: string;
  label: string;
}>;

type TrackerFilters = {
  dateFrom: string | null;
  dateTo: string | null;
  searchTerm: string;
};

type TrackerToolbarProps = {
  onStopAll: () => void;
  onAdd: () => void;
  trackersCount: number;
};

type TrackerActionsProps = {
  onPause?: (tracker: Tracker) => void;
  onPlay?: (tracker: Tracker) => void;
  onStop?: (tracker: Tracker) => void;
  onEdit: (tracker: Tracker) => void;
  onDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    tracker: Tracker
  ) => void;
  tracker: Tracker;
  toast?: Toast | null;
};

export type {
  TrackerFilterContainerProps,
  TrackerFilters,
  EditTrackerProps,
  TrackerFormValues,
  TrackerToolbarProps,
  TrackerActionsProps,
};
