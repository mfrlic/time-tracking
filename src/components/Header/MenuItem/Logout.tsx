"use client";

import clsx from "clsx";
import styles from "./MenuItem.module.scss";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants";
import { logout } from "@/app/api/client";

export default function LogoutMenuItem() {
  const { push } = useRouter();

  const handleLogout = async () => {
    await logout();

    push(routes.login);
  };

  return (
    <div className={styles.root} onClick={handleLogout}>
      <i className={clsx("pi pi-power-off", styles.icon__inactive)} />
      <span className={styles.title__inactive}>Logout</span>
    </div>
  );
}
