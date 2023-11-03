"use client";

import { usePathname } from "next/navigation";
import styles from "./Menu.module.scss";

import { PropsWithChildren, useMemo } from "react";
import { routes } from "@/utils/constants";

export default function Menu({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const shouldRender = useMemo(() => {
    return pathname !== routes.login;
  }, [pathname]);

  if (!shouldRender) return null;

  return <div className={styles.root}>{children}</div>;
}
