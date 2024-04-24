import { useTranslation } from 'react-i18next';
import { Menu, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../ui/Logo';
import IconButton from '../../ui/IconButton/IconButton';
import AgendaItem from './AgendaItem';

interface MenuItem {
  link: string;
  icon: React.ReactNode;
  label?: string;
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
    link: '/test',
    icon: <img src="/img/temp-nav-item.png" alt="notifications" />,
  },
  {
    link: '/test2',
    icon: <img src="/img/temp-nav-item.png" alt="sharing-hub" />,
  },
  {
    link: '/test3',
    icon: <img src="/img/temp-nav-item.png" alt="customize" />,
  },
  {
    link: '/agenda/create',
    icon: <img src="/icons/plus.svg" alt="create" />,
  },
];

const AgendaNavigation = ({
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

        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              color: active ? 'black' : 'gray',
              backgroundColor: active ? 'rgba(0, 0, 0, 0.1)' : 'white',
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
          <p>Agenda list</p>
          {menuItems.map(({ link, icon }) => (
            <AgendaItem
              key={link}
              link={link}
              icon={icon}
              onClick={handleOnClickMenu}
            />
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

export default AgendaNavigation;
