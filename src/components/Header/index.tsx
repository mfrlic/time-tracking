import Image from "next/image";
import styles from "./Header.module.scss";
import MenuItem from "./MenuItem";
import { LOGO_URL, routes } from "@/utils/constants";
import Menu from "./Menu";
import type { MenuItemProps } from "./types";

const menuItemProps: MenuItemProps[] = [
  {
    href: routes.trackers,
    icon: "pi-clock",
    title: "Trackers",
    isFirst: true,
  },
  {
    href: routes.history,
    icon: "pi-history",
    title: "History",
    isLast: true,
  },
  {
    icon: "pi-power-off",
    title: "Logout",
    isLogout: true,
  },
];

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.logo}>
        <Image
          src={LOGO_URL}
          alt="devōt logo"
          height={44}
          width={162}
          priority
        />
        <h1 className={styles.title}>Tracking tool</h1>
      </div>
      <Menu>
        {menuItemProps?.map((props) => (
          <MenuItem key={props.title} {...props} />
        ))}
      </Menu>
    </header>
  );
}
