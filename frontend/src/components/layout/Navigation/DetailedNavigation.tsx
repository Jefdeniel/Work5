import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Menu, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Logo from '../../ui/Logo';

import { MenuItem, SideBarProps } from '../../../@types/Nav';
import BackButton from '../../ui/Button/BackButton';
import Icon from '../../ui/Icon/Icon';
import {
  CustomizeIcon,
  InspirationIcon,
  NotificationIcon,
  SharingHubIcon,
} from '../../ui/Icon/SvgIcons';
import IconButton from '../../ui/IconButton/IconButton';
import Calendar from '../../ui/SmallCalendar/SmallCalendar';
import DetailedNavItem from './DetailedNavItem';

import './navigation.scss';

const DetailedNavigation = ({
  isMenuBroken,
  isMenuCollapsed,
  isMenuToggled,
  setIsMenuToggled,
  setIsMenuBroken,
}: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(['general']);
  const params = useParams();

  const menuItems: MenuItem[] = [
    {
      link: `/calendar/notifications/${params.id}`,
      label: 'general:navigation.notifications',
      icon: <NotificationIcon />,
    },
    {
      link: `/calendar/sharing-hub/${params.id}`,
      label: 'general:navigation.sharing-hub',
      icon: <SharingHubIcon />,
    },
    {
      link: `/calendar/customize/${params.id}`,
      label: 'general:navigation.customize',
      icon: <CustomizeIcon />,
    },
    {
      link: `/calendar/inspiration/${params.id}`,
      label: 'general:navigation.inspiration',
      icon: <InspirationIcon />,
    },
  ];

  const handleOnClickMenu = (link: string) => {
    navigate(link);
    isMenuBroken && setIsMenuToggled(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    isMenuBroken && setIsMenuToggled(false);
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
        className={`sidebar d-flex flex-column justify-content-center`}
      >
        <Row className="mb-large">
          <Col>
            <Link to="/calendar/overview">
              <Logo
                width={isMenuCollapsed ? '50px' : '50px'}
                height={isMenuCollapsed ? '50px' : '50px'}
              />
            </Link>
          </Col>

          <Col className={`d-flex justify-content-end`}>
            {!isMenuCollapsed && (
              <IconButton
                className={`settings-btn`}
                icon={<Icon src="/icons/settings.svg" alt="Settings icon" />}
                onClick={handleSettingsClick}
              />
            )}
          </Col>
        </Row>

        {!isMenuCollapsed && (
          <BackButton
            text={t('general:buttons.back')}
            className={`back-btn mb-base`}
            linkTo={
              location.pathname === '/calendar/main'
                ? '/calendar/overview'
                : undefined
            }
          />
        )}
        {!isMenuCollapsed && <Calendar noNavigation />}

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
          {menuItems.map(({ link, icon, label }) => (
            <DetailedNavItem
              key={link}
              link={link}
              icon={icon}
              onClick={handleOnClickMenu}
            >
              {t(label?.toString() ?? '')}
            </DetailedNavItem>
          ))}
        </Menu>
      </Sidebar>
    </>
  );
};

export default DetailedNavigation;
