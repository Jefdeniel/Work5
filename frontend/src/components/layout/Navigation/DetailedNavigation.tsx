import { useTranslation } from 'react-i18next';
import { Menu, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Button from '../../ui/Button/Button';
import Logo from '../../ui/Logo';
import NavigationItem from './NavigationItem';

interface MenuItem {
  link: string;
  icon: React.ReactNode;
  label: string;
}

interface Props {
  title: string;
  isMenuBroken: boolean;
  isMenuCollapsed: boolean;
  isMenuToggled: boolean;
  setIsMenuToggled: (value: boolean) => void;
  setIsMenuBroken: (value: boolean) => void;
  onMenuClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    link: '/notifications',
    icon: <img src="/icons/notifications.svg" alt="notifications" />,
    label: 'general:navigation.notifications',
  },
  {
    link: '/sharing-hub',
    icon: <img src="/icons/share.svg" alt="sharing-hub" />,
    label: 'general:navigation.sharing-hub',
  },
  {
    link: '/customize-agenda',
    icon: <img src="/icons/customize.svg" alt="customize" />,
    label: 'general:navigation.customize',
  },
];

const DetailedNavigation = ({
  isMenuBroken,
  isMenuCollapsed,
  isMenuToggled,
  setIsMenuToggled,
  setIsMenuBroken,
}: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(['general']);

  const menuWidth = isMenuToggled ? menuItems.length * 75 + 'px' : 'auto';
  const handleOnClickMenu = (link: string) => {
    navigate(link);
    isMenuBroken && setIsMenuToggled(false);
  };

  // TODO: fix this
  const onLogout = () => {
    auth.logout();
  };

  return (
    <>
      <Sidebar
        collapsed={isMenuCollapsed}
        toggled={isMenuToggled}
        onBackdropClick={() => setIsMenuToggled(false)}
        onBreakPoint={setIsMenuBroken}
        breakPoint="md"
        backgroundColor="white"
        width="250px"
        style={{
          borderRight: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="d-flex justify-content-center my-4">
          <Link to="/" className="mb-2 mt-2 text-center">
            <Logo width={isMenuCollapsed ? '50px' : '150px'} height="50px" />
          </Link>
        </div>

        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              color: active ? 'white' : 'black',
              backgroundColor: active ? 'black' : 'white',
              padding: '10px 15px',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 7,
              height: 40,
              '&:hover': {
                backgroundColor: active ? 'black' : 'rgba(0, 0, 0, 0.1)',
              },
            }),
          }}
        >
          {menuItems.map(({ link, icon, label }) => (
            <NavigationItem
              key={link}
              link={link}
              icon={icon}
              onClick={handleOnClickMenu}
            >
              {t(label.toString())}
            </NavigationItem>
          ))}
        </Menu>
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 25,
            width: menuWidth,
            display: 'flex',
            justifyContent: isMenuToggled ? 'space-between' : 'center',
          }}
        >
          <Button
            icon={<img src="/icons/logout.svg" alt="logout" />}
            name="logoutButton"
            onClick={onLogout}
            text={t('general:buttons.logout')}
            style={{ marginLeft: isMenuToggled ? 0 : 15 }}
          />
        </div>
      </Sidebar>
    </>
  );
};

export default DetailedNavigation;
