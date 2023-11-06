type MenuItemProps = {
  href?: string;
  icon: string;
  title: string;
  isFirst?: boolean;
  isLast?: boolean;
  isLogout?: true;
};

type MenuItemContainerProps = React.PropsWithChildren<{
  href?: string;
  onClick?: () => void;
}>;

export type { MenuItemProps, MenuItemContainerProps };
