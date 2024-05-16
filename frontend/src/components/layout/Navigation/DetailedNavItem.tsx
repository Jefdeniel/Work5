import { MenuItem } from 'react-pro-sidebar';
import { useLocation } from 'react-router-dom';

interface Props {
  icon: React.ReactNode;
  link: string;
  onClick: (link: string, isSubMenu?: boolean) => void;
  isSubMenu?: boolean;
  style?: React.CSSProperties;
  children: string;
}

const DetailedNavItem = ({
  icon,
  link,
  onClick,
  isSubMenu,
  style,
  children,
}: Props) => {
  const location = useLocation();

  const isActive = location.pathname.includes(link);

  const handleOnClick = () => {
    onClick(link, isSubMenu);
  };

  return (
    <MenuItem
      icon={icon}
      onClick={handleOnClick}
      active={isActive}
      style={style}
    >
      {children}
    </MenuItem>
  );
};

export default DetailedNavItem;
