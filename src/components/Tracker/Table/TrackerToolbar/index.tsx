import { StopIcon } from "@/assets/icons";
import StopwatchIcon from "@/assets/icons/StopwatchIcon";
import { Button } from "primereact/button";
import styles from "./TrackerToolbar.module.scss";
import type { TrackerToolbarProps } from "../../types";

const iconProps = {
  color: "white",
  className: styles.icon,
};

export default function TrackerToolbar({
  onStopAll,
  onAdd,
  trackersCount,
}: TrackerToolbarProps) {
  return (
    <div className={styles.root}>
      <Button
        label="Start a new timer"
        onClick={onAdd}
        icon={<StopwatchIcon {...iconProps} />}
      />
      <Button
        label="Stop all"
        disabled={trackersCount === 0}
        severity="secondary"
        onClick={onStopAll}
        icon={<StopIcon {...iconProps} />}
      />
    </div>
  );
}
