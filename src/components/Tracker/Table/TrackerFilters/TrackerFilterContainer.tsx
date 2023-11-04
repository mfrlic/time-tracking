import styles from "./TrackerFilters.module.scss";
import type { TrackerFilterContainerProps } from "../../types";

export default function TrackerFilterContainer({
  children,
  htmlFor,
  label,
}: TrackerFilterContainerProps) {
  return (
    <div className={styles.filter}>
      <label htmlFor={htmlFor} className={styles.filter__label}>
        {label}
      </label>
      {children}
    </div>
  );
}
