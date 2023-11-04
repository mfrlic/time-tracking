"use client";

import clsx from "clsx";
import styles from "./MenuItem.module.scss";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

type MenuItemProps = {
  href: string;
  icon: string;
  title: string;
  isFirst?: boolean;
  isLast?: boolean;
};

export default function MenuItem({
  href,
  icon,
  title,
  isFirst,
  isLast,
}: MenuItemProps) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (!href) return false;
    return pathname === href;
  }, [href, pathname]);

  return (
    <Link href={href} className={styles.root}>
      <i
        className={clsx(
          "pi",
          icon,
          isActive ? styles.icon__active : styles.icon__inactive
        )}
      />
      <span
        className={isActive ? styles.title__active : styles.title__inactive}
      >
        {title}
      </span>

      <span
        className={clsx(
          styles.bar,
          {
            [styles.bar__start]: isFirst,
            [styles.bar__end]: isLast,
          },
          isActive ? styles.bar__active : styles.bar__inactive
        )}
      />
    </Link>
  );
}
