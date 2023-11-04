import clsx from "clsx";
import styles from "./PageTitle.module.scss";

export default function PageTitle({
  title,
  icon,
}: {
  title: string;
  icon?: string;
}) {
  return (
    <div className={styles.root}>
      {icon ? <i className={clsx("pi", `pi-${icon}`, styles.icon)} /> : null}
      <span className={styles.title}>{title}</span>
    </div>
  );
}
