import Nav from '../_shared/Nav';
import Footer from '../_shared/Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
