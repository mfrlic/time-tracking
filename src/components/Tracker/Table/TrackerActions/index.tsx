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
import { updateTracker } from "@/app/api/client";
import { SHARE_LINK_COPIED_MESSAGE } from "@/utils/constants";

function generateSecretCode(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let secretCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    secretCode += characters.charAt(randomIndex);
  }

  return secretCode;
}

export default function Actions({
  tracker,
  onPause,
  onPlay,
  onStop,
  onDelete,
  onEdit,
  toast,
}: TrackerActionsProps) {
  const showControls = useMemo(() => {
    return !!(onPause && onPlay && onStop);
  }, [onPause, onPlay, onStop]);

  const handleShare = () => {
    let shareCode = tracker?.shareCode;

    if (!shareCode) {
      shareCode = generateSecretCode(64);

      updateTracker({
        idTracker: tracker.idTracker,
        shareCode,
      });
    }

    navigator.clipboard.writeText(
      `${window.location.origin}/tracker/${shareCode}`
    );

    toast?.show(SHARE_LINK_COPIED_MESSAGE);
  };

  return (
    <div className={styles.root}>
      {showControls ? (
        <>
          {!tracker.lastPlayedAt ? (
            <Button
              icon={<PlayIcon className={styles.icon} />}
              onClick={() => {
                onPlay?.(tracker);
              }}
              rounded
              text
              aria-label="Play"
            />
          ) : (
            <Button
              icon={<PauseIcon className={styles.icon} />}
              onClick={() => {
                onPause?.(tracker);
              }}
              rounded
              text
              aria-label="Pause"
            />
          )}

          <Button
            icon={<StopIcon className={styles.icon} />}
            onClick={() => {
              onStop?.(tracker);
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
          onEdit(tracker);
        }}
        rounded
        text
        aria-label="Edit"
      />
      <Button
        icon={<TrashIcon className={styles.icon} />}
        onClick={(event) => onDelete(event, tracker)}
        rounded
        text
        aria-label="Delete"
      />
      <Button
        icon={<i className="pi pi-share-alt" style={{ color: "#5F6B8A" }} />}
        onClick={handleShare}
        rounded
        text
        aria-label="Share"
      />
    </div>
  );
}
