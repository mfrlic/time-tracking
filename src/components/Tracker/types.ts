import type { Tracker, TrackerDTO } from "@/app/api/types";
import type { MouseEvent, PropsWithChildren } from "react";

type EditTrackerProps = {
  editingTracker: Tracker | TrackerDTO | null;
  onDialogHide: () => void;
};

type TrackerFormValues = {
  description: string;
};

type TrackerFilterContainerProps = PropsWithChildren<{
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
};

type TrackerActionsProps = {
  activeTracker?: Tracker;
  onPause?: (tracker: Tracker) => void;
  onPlay?: (tracker: Tracker) => void;
  onStop?: (tracker: Tracker) => void;
  onEdit: (tracker: Tracker) => void;
  onDelete: (event: MouseEvent<SVGSVGElement>, tracker: Tracker) => void;
} & Tracker;

export type {
  TrackerFilterContainerProps,
  TrackerFilters,
  EditTrackerProps,
  TrackerFormValues,
  TrackerToolbarProps,
  TrackerActionsProps,
};
