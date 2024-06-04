import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { Container, Row } from 'react-bootstrap';

import DetailedNavigation from '../components/layout/Navigation/DetailedNavigation';
import NavigationTop from '../components/layout/Navigation/NavigationTop';

import './Layout.scss';

// USER FOR DETAILED SIDEBAR
const Layout = () => {
  const [isMenuBroken, setIsMenuBroken] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const { theme } = useSettings();

  const handleMenuClose = () => {
    if (isMenuBroken) {
      setIsMenuToggled((prev) => !prev);
    } else {
      setIsMenuCollapsed((prev) => !prev);
    }
  };
  return (
    <div
      className={`d-flex flex-row p-0 ${theme === 'dark' ? 'dark-theme' : ''}`}
      style={{ minHeight: '100%' }}
      data-bs-theme={theme}
    >
      <DetailedNavigation
        isMenuBroken={isMenuBroken}
        isMenuCollapsed={isMenuCollapsed}
        isMenuToggled={isMenuToggled}
        setIsMenuToggled={setIsMenuToggled}
        setIsMenuBroken={setIsMenuBroken}
        onMenuClose={handleMenuClose}
      />
      <Container
        fluid
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          width: '100%',
          overflowY: 'auto',
          borderBottom: '1px solid black',
          padding: 0,
        }}
      >
        <Row className="flex-row top-navigation border-bottom">
          <NavigationTop
            onMenuClose={() => {
              if (isMenuBroken) {
                setIsMenuToggled((prev) => !prev);
              } else {
                setIsMenuCollapsed((prev) => !prev);
              }
            }}
          />
        </Row>
        <Row className="top-navigation">
          <Outlet />
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
