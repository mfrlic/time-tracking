import { useMemo } from "react";
import {
  EditIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
  TrashIcon,
} from "@/assets/icons";
import styles from "./TrackerActions.module.scss";
import type { TrackerActionsProps } from "../../types";

export default function Actions({
  activeTracker,
  onPause,
  onPlay,
  onStop,
  onDelete,
  onEdit,
  ...data
}: TrackerActionsProps) {
  const isPlaying = useMemo(() => {
    return activeTracker?.id === data.id;
  }, [activeTracker, data]);

  const showControls = useMemo(() => {
    return onPause && onPlay && onStop;
  }, [onPause, onPlay, onStop]);

  return (
    <div className={styles.root}>
      {showControls ? (
        <>
          {!isPlaying ? (
            <PlayIcon
              className={styles.icon}
              onClick={() => {
                onPlay?.(data);
              }}
            />
          ) : (
            <PauseIcon
              className={styles.icon}
              onClick={() => {
                onPause?.(data);
              }}
            />
          )}
          <StopIcon
            className={styles.icon}
            onClick={() => {
              onStop?.(data);
            }}
          />
        </>
      ) : null}

      <EditIcon
        className={styles.icon}
        onClick={() => {
          onEdit(data);
        }}
      />
      <TrashIcon
        className={styles.icon}
        onClick={(event) => onDelete(event, data)}
      />
    </div>
  );
}
