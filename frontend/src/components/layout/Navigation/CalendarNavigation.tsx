import { Menu, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '../../ui/IconButton/IconButton';
import CalendarNavItem from './CalendarNavItem';
import { Col, Row } from 'react-bootstrap';
import Logo from '../../ui/Logo';
import { MenuItem, SideBarProps } from '../../../@types/Nav';

const menuItems: MenuItem[] = [
  {
    link: '/test',
    icon: <img src="/img/temp-nav-item.png" alt="agenda1" />,
  },
  {
    link: '/test2',
    icon: <img src="/img/temp-nav-item.png" alt="agenda2" />,
  },
  {
    link: '/test3',
    icon: <img src="/img/temp-nav-item.png" alt="agenda3" />,
  },
  {
    link: '/calendar/create',
    icon: <img src="/icons/plus.svg" alt="create" />,
  },
];

const CalendarNavigation = ({
  isMenuBroken,
  isMenuCollapsed,
  isMenuToggled,
  setIsMenuToggled,
  setIsMenuBroken,
}: SideBarProps) => {
  const navigate = useNavigate();

  const menuWidth = isMenuToggled ? menuItems.length * 75 + 'px' : 'auto';
  const handleOnClickMenu = (link: string) => {
    navigate(link);
    isMenuBroken && setIsMenuToggled(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
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
        backgroundColor="var(--sa-bright)"
        width="250px"
        style={{
          borderRight: '1px solid var(--sa-primary-200)',
        }}
        className={`sidebar`}
      >
        <Row className="mb-large">
          <Col>
            <Link to="/">
              <Logo
                width={isMenuCollapsed ? '50px' : '50px'}
                height={isMenuCollapsed ? '50px' : '50px'}
              />
            </Link>
          </Col>

          <Col className={`d-flex justify-content-end`}>
            <IconButton
              icon={<img src="/icons/settings.svg" alt="Close icon" />}
              onClick={handleSettingsClick}
            />
          </Col>
        </Row>

        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              fontWeight: active ? 'bold' : 'normal',
              color: active
                ? 'var(--sa-primary-500-base)'
                : 'var(--sa-primary-950)',
              borderLeft: active ? '12px solid' : 'none',
              borderRadius: 'var(--br-base)',
              height: 40,
              '&:hover': {
                backgroundColor: active ? 'none' : 'var(--sa-primary-100)',
              },
            }),
          }}
        >
          {menuItems.map(({ link, icon }) => (
            <CalendarNavItem
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
        ></div>
      </Sidebar>
    </>
  );
};

export default CalendarNavigation;
