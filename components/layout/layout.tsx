import Nav from 'components/_shared/Nav';
import Footer from 'components/_shared/Footer';
import Skiplink from 'components/_shared/Skiplink';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Skiplink />
      <Nav />
      <div className="sr-only">
        <span id="maincontent">-</span>
      </div>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
