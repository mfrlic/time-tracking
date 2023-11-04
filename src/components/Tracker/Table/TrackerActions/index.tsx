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
import { Button } from "primereact/button";

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
    return activeTracker?.idTracker === data.idTracker;
  }, [activeTracker, data]);

  const showControls = useMemo(() => {
    return onPause && onPlay && onStop;
  }, [onPause, onPlay, onStop]);

  return (
    <div className={styles.root}>
      {showControls ? (
        <>
          {!isPlaying ? (
            <Button
              icon={<PlayIcon className={styles.icon} />}
              onClick={() => {
                onPlay?.(data);
              }}
              rounded
              text
              aria-label="Play"
            />
          ) : (
            <Button
              icon={<PauseIcon className={styles.icon} />}
              onClick={() => {
                onPause?.(data);
              }}
              rounded
              text
              aria-label="Pause"
            />
          )}

          <Button
            icon={<StopIcon className={styles.icon} />}
            onClick={() => {
              onStop?.(data);
            }}
            rounded
            text
            aria-label="Stop"
          />
        </>
      ) : null}

      <Button
        icon={<EditIcon className={styles.icon} />}
        onClick={() => {
          onEdit(data);
        }}
        rounded
        text
        aria-label="Edit"
      />

      <Button
        icon={<TrashIcon className={styles.icon} />}
        onClick={(event) => onDelete(event, data)}
        rounded
        text
        aria-label="Delete"
      />
    </div>
  );
}
