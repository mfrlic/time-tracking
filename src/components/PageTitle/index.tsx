import styles from "./PageTitle.module.scss";

export default function PageTitle({
  title,
  icon = null,
}: {
  title: string;
  icon?: React.ReactNode | null;
}) {
  return (
    <div className={styles.root}>
      {icon}
      <span className={styles.title}>{title}</span>
    </div>
  );
}
