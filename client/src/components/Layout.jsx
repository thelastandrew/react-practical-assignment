import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav';

const Layout = () => {
  const layoutStyles = {
    padding: '0 20px',
  };
  return (
    <>
      <Nav />
      <div style={layoutStyles}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
