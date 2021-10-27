import Nav from '../_shared/Nav';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
