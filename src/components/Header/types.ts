type MenuItemProps = {
  href?: string;
  icon: string;
  title: string;
  isFirst?: boolean;
  isLast?: boolean;
  isLogout?: true;
  ariaLabel?: string;
};

type MenuItemContainerProps = React.PropsWithChildren<
  Pick<MenuItemProps, "href" | "ariaLabel"> & {
    onClick?: () => void;
  }
>;

export type { MenuItemProps, MenuItemContainerProps };
