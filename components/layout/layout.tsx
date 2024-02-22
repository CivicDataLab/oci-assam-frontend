import Nav from 'components/_shared/Nav';
import Footer from 'components/_shared/Footer';
import Skiplink from 'components/_shared/Skiplink';
import React from 'react';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
