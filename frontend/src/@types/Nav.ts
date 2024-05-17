export interface MenuItem {
  link: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export interface SideBarProps {
  isMenuBroken: boolean;
  isMenuCollapsed: boolean;
  isMenuToggled: boolean;
  setIsMenuToggled: (value: boolean) => void;
  setIsMenuBroken: (value: boolean) => void;
  onMenuClose: () => void;
}
