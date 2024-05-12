import { useTranslation } from 'react-i18next';
import { Menu, Sidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../ui/Button/BackButton';
import IconButton from '../../ui/IconButton/IconButton';
import Logo from '../../ui/Logo';
import DetailedNavItem from './DetailedNavItem';
import Calendar from '../../ui/SmallCalendar/SmallCalendar';
import { Col, Row } from 'react-bootstrap';

import './navigation.scss';

interface MenuItem {
  link: string;
  icon: React.ReactNode;
  label: string;
}

interface Props {
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
    icon: (
      <svg
        width="13"
        height="15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 0a.932.932 0 0 0-.93.938V1.5c-2.117.434-3.713 2.326-3.713 4.594v.55a5.67 5.67 0 0 1-1.408 3.739l-.215.243a.948.948 0 0 0-.153 1.008.927.927 0 0 0 .847.553h11.143a.93.93 0 0 0 .847-.553.942.942 0 0 0-.154-1.008l-.214-.243a5.664 5.664 0 0 1-1.408-3.738v-.551c0-2.268-1.596-4.16-3.714-4.594V.937A.932.932 0 0 0 6.499 0Zm1.314 14.452c.348-.351.542-.829.542-1.327H4.642c0 .498.195.976.543 1.327a1.849 1.849 0 0 0 2.629 0Z"
          fill="var(--sa-primary-950)"
        />
      </svg>
    ),
    label: 'general:navigation.notifications',
  },
  {
    link: '/sharing-hub',
    icon: (
      <svg
        width="15"
        height="11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.688 1.375c0-.365.138-.714.384-.972S2.652 0 3 0c.348 0 .682.145.928.403s.385.607.385.972-.139.714-.385.972-.58.403-.928.403c-.348 0-.682-.145-.928-.403a1.409 1.409 0 0 1-.385-.972ZM1.5 5.247c-.234.275-.375.641-.375 1.039 0 .397.14.763.375 1.038V5.247Zm3.384-1.21A3.595 3.595 0 0 0 3.75 6.679c0 .842.281 1.615.75 2.222v.528c0 .434-.335.785-.75.785h-1.5c-.415 0-.75-.35-.75-.785V8.77C.614 8.329 0 7.383 0 6.286c0-1.52 1.174-2.75 2.625-2.75h.75c.563 0 1.083.184 1.51.498v.003ZM10.5 9.429V8.9c.469-.607.75-1.38.75-2.222 0-1.051-.438-1.997-1.134-2.645a2.533 2.533 0 0 1 1.509-.498h.75c1.45 0 2.625 1.23 2.625 2.75 0 1.097-.614 2.043-1.5 2.485v.658c0 .434-.335.785-.75.785h-1.5c-.415 0-.75-.35-.75-.785Zm.188-8.054c0-.365.138-.714.384-.972S11.652 0 12 0c.348 0 .682.145.928.403s.384.607.384.972-.138.714-.384.972-.58.403-.928.403c-.348 0-.682-.145-.928-.403a1.41 1.41 0 0 1-.384-.972ZM13.5 5.247v2.08c.234-.278.375-.641.375-1.039 0-.398-.14-.763-.375-1.038v-.003ZM7.5 0c.398 0 .78.166 1.06.46.282.295.44.695.44 1.111 0 .417-.158.817-.44 1.112-.28.294-.662.46-1.06.46s-.78-.166-1.06-.46A1.61 1.61 0 0 1 6 1.57c0-.416.158-.816.44-1.11C6.72.165 7.101 0 7.5 0ZM5.625 6.679c0 .397.14.76.375 1.038V5.64c-.234.277-.375.64-.375 1.039ZM9 5.64v2.08c.234-.278.375-.641.375-1.039 0-.398-.14-.764-.375-1.039V5.64Zm1.5 1.039c0 1.097-.614 2.042-1.5 2.484v1.051c0 .435-.335.786-.75.786h-1.5c-.415 0-.75-.351-.75-.786v-1.05c-.886-.443-1.5-1.388-1.5-2.485 0-1.52 1.174-2.75 2.625-2.75h.75c1.45 0 2.625 1.23 2.625 2.75Z"
          fill="var(--sa-primary-950)"
        />
      </svg>
    ),
    label: 'general:navigation.sharing-hub',
  },
  {
    link: '/customize',
    icon: (
      <svg
        width="13"
        height="13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 6.5v.069c-.01.926-.853 1.556-1.78 1.556H8.734a1.22 1.22 0 0 0-1.193 1.47c.053.26.165.508.274.76.155.35.307.697.307 1.066 0 .807-.548 1.54-1.355 1.574A6.499 6.499 0 0 1 0 6.5 6.5 6.5 0 0 1 6.5 0 6.5 6.5 0 0 1 13 6.5Zm-9.75.813a.812.812 0 1 0-1.625 0 .812.812 0 0 0 1.625 0Zm0-2.438a.812.812 0 1 0 0-1.625.812.812 0 0 0 0 1.625Zm4.063-2.438a.812.812 0 1 0-1.625 0 .812.812 0 0 0 1.625 0ZM9.75 4.876a.812.812 0 1 0 0-1.625.812.812 0 0 0 0 1.625Z"
          fill="var(--sa-primary-950)"
        />
      </svg>
    ),
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
        backgroundColor="white"
        width="250px"
        style={{
          borderRight: '1px solid var(--sa-grey)',
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
              icon={<img src="/icons/settings.svg" alt="close" />}
              onClick={handleSettingsClick}
            />
          </Col>
        </Row>

        <BackButton text={t('general:buttons.back')} className={`mb-base`} />

        <span className={`heading heading--md sidebar__calendar-title`}>
          Calendar name
        </span>

        <Calendar />

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
              {t(label.toString())}
            </DetailedNavItem>
          ))}
        </Menu>
      </Sidebar>
    </>
  );
};

export default DetailedNavigation;
