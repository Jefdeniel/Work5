import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import '../App.scss';

// USED FOR LOGIN AND REGISTER
const AccountLayout = () => {
  return (
    <Container
      className="flex justify-center items-center"
      style={{
        height: '100vh',
      }}
      fluid
    >
      <Outlet />
    </Container>
  );
};

export default AccountLayout;
