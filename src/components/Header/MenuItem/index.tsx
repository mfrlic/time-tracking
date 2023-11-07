"use client";

import clsx from "clsx";
import styles from "./MenuItem.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { logout } from "@/app/api/client";
import { routes } from "@/utils/constants";
import type { MenuItemContainerProps, MenuItemProps } from "../types";

const MenuItemContainer = ({
  children,
  href,
  onClick,
  ariaLabel,
}: MenuItemContainerProps) => {
  const sharedProps = {
    className: styles.root,
  };

  if (href) {
    return (
      <Link
        {...sharedProps}
        href={href}
        aria-label={ariaLabel}
        data-testid="menu-item"
      >
        {children}
      </Link>
    );
  }

  return (
    <span {...sharedProps} onClick={onClick} data-testid="menu-item">
      {children}
    </span>
  );
};

export default function MenuItem({
  href,
  icon,
  title,
  isFirst,
  isLast,
  isLogout,
}: MenuItemProps) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (!href) return false;
    return pathname === href;
  }, [href, pathname]);

  const { push } = useRouter();

  const handleLogout = async () => {
    await logout();

    push(routes.login);
  };

  return (
    <MenuItemContainer onClick={handleLogout} href={href}>
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

      {!isLogout ? (
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
      ) : null}
    </MenuItemContainer>
  );
}
