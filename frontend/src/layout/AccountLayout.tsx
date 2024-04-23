import { Outlet } from 'react-router-dom';

// USED FOR LOGIN AND REGISTER
const AccountLayout = () => {
  return (
    // <div className="container"> fix this with bootstrap or tailwind
    <div
      className="container mx-auto my-auto flex justify-center items-center"
      style={{
        height: '100vh',
        backgroundColor: 'white',
      }}
      // fluid
    >
      <Outlet />
    </div>
  );
};

export default AccountLayout;
