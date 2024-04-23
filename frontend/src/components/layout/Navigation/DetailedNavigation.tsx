import { useTranslation } from 'react-i18next';
import { Menu, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button/Button';
import IconButton from '../../ui/IconButton/IconButton';
import Logo from '../../ui/Logo';
import DetailedItem from './DetailedItem';

import './navigation.css';

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
  const navigate = useNavigate();
  const { t } = useTranslation(['general']);

  const menuWidth = isMenuToggled ? menuItems.length * 75 + 'px' : 'auto';
  const handleOnClickMenu = (link: string) => {
    navigate(link);
    isMenuBroken && setIsMenuToggled(false);
  };

  // TODO: fix this
  const onLogout = () => {
    console.log('logout');
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
        className={`sidebar`}
      >
        <div className="d-flex flex-row justify-content-between my-4">
          <div className="d-flex flex-col">
            <Link to="/">
              <Logo width={isMenuCollapsed ? '50px' : '75px'} height="50px" />
            </Link>
          </div>
          <IconButton
            icon={<img src="/icons/settings.svg" alt="close" />}
            onClick={() => navigate('/settings')}
          />
        </div>

        <div>
          <Button
            icon={<img src="/icons/back.svg" alt="home" />}
            onClick={() => {
              window.history.back();
            }}
            text={t('general:buttons.back')}
            style={{ marginTop: 10 }}
          />
        </div>

        <img
          src="/img/agenda.png"
          alt="close"
          onClick={() => setIsMenuToggled(false)}
          style={{ cursor: 'pointer', padding: 10 }}
        />

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
            <DetailedItem
              key={link}
              link={link}
              icon={icon}
              onClick={handleOnClickMenu}
            >
              {t(label.toString())}
            </DetailedItem>
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
          <IconButton
            icon={<img src="/icons/logout.svg" alt="logout" />}
            onClick={onLogout}
            style={{ marginLeft: isMenuToggled ? 0 : 15 }}
          />
        </div>
      </Sidebar>
    </>
  );
};

export default DetailedNavigation;
