import { MenuItem } from 'react-pro-sidebar';
import { useLocation } from 'react-router-dom';

interface Props {
  icon: React.ReactNode;
  link: string;
  className?: string;
  onClick: (link: string, isSubMenu?: boolean) => void;
  isSubMenu?: boolean;
  style?: React.CSSProperties;
  children?: string;
}

const CalendarNavItem = ({
  icon,
  link,
  className,
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
      style={{
        backgroundColor: 'white',
        ...{ style },
      }}
      icon={icon}
      className={className}
      onClick={handleOnClick}
      active={isActive}
    >
      {children}
    </MenuItem>
  );
};

export default CalendarNavItem;
