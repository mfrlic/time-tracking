import { UserAddIcon } from "@/assets/icons";
import Link from "next/link";
import styles from "./AuthFooter.module.scss";
import type { AuthFooterProps } from "../types";

export default function AuthFooter({ href, title, linkText }: AuthFooterProps) {
  return (
    <div className={styles.root}>
      <UserAddIcon className={styles.icon} />
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <Link className={styles.link} href={href}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}
