import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CalendarNavigation from '../components/layout/Navigation/CalendarNavigation';
import NavigationTop from '../components/layout/Navigation/NavigationTop';
import './Layout.scss';
import { Container, Row } from 'react-bootstrap';

interface Props {
  title: string;
}

// USER FOR CALENDAR SIDEBAR
const CalendarLayout = ({ title }: Props) => {
  const [isMenuBroken, setIsMenuBroken] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const handleMenuClose = () => {
    if (isMenuBroken) {
      setIsMenuToggled((prev) => !prev);
    } else {
      setIsMenuCollapsed((prev) => !prev);
    }
  };
  return (
    <div className="d-flex flex-row p-0" style={{ minHeight: '100%' }}>
      <CalendarNavigation
        title={title}
        isMenuBroken={isMenuBroken}
        isMenuCollapsed={isMenuCollapsed}
        isMenuToggled={isMenuToggled}
        setIsMenuToggled={setIsMenuToggled}
        setIsMenuBroken={setIsMenuBroken}
        onMenuClose={handleMenuClose}
      />
      <Container
        className="container-fluid p-0"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          overflowY: 'auto',
          borderBottom: '1px solid black',
          padding: 0,
        }}
      >
        <Row className="top-navigation border-bottom">
          <NavigationTop
            title={title}
            onMenuClose={() => {
              if (isMenuBroken) {
                setIsMenuToggled((prev) => !prev);
              } else {
                setIsMenuCollapsed((prev) => !prev);
              }
            }}
          />
        </Row>
        <Row>
          <Outlet />
        </Row>
      </Container>
    </div>
  );
};

export default CalendarLayout;
