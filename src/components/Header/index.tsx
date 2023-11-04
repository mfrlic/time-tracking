import Image from "next/image";
import styles from "./Header.module.scss";
import MenuItem from "./MenuItem";
import LogoutMenuItem from "./MenuItem/Logout";
import { LOGO_URL, routes } from "@/utils/constants";
import Menu from "./Menu";

const menuItems = [
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
];

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.logo}>
        <Image src={LOGO_URL} alt="devōt logo" height={44} width={162} priority />
        <h1 className={styles.title}>Tracking tool</h1>
      </div>
      <Menu>
        {menuItems?.map((props) => (
          <MenuItem key={props.title} {...props} />
        ))}
        <LogoutMenuItem />
      </Menu>
    </header>
  );
}
