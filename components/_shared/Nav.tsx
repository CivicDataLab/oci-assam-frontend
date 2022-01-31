/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
Modal.setAppElement('#__next');

const navList = [
  {
    link: '/datasets',
    name: 'Contracts Data',
  },
  {
    link: '/kpi',
    name: 'Data Analysis',
  },
  {
    link: '/stories',
    name: 'Data Stories',
  },
  // {
  //   link: '#forum',
  //   name: 'Forum',
  //   hasSubMenu: true,
  //   subMenu: [
  //     {
  //       link: '/',
  //       name: 'Forum A',
  //     },
  //     {
  //       link: '/',
  //       name: 'Forum B',
  //     },
  //   ],
  // },
  {
    link: '/about',
    name: 'About Us',
  },
];

const Nav: React.FC = () => {
  const router = useRouter();
  const [navIsOpen, setNavIsOpen] = useState(false);

  // opening / closing mobile navbar
  function mobileNavHandler() {
    setNavIsOpen(!navIsOpen);
  }

  // open / close sub-menu
  function navButtonHandler(e: any) {
    // if clicked on already opened menu
    if (e.target.getAttribute('aria-expanded') == 'true') {
      e.target.setAttribute('aria-expanded', 'false');
      e.target.setAttribute(
        'aria-label',
        e.target.getAttribute('data-text-for-show')
      );
      e.target.nextElementSibling.setAttribute('hidden', 'true');
    } else {
      // remove previous opened menu
      if (
        document.querySelector('.m-navbar__links > [aria-expanded="true"]') ||
        document.querySelector('.navbar__links > [aria-expanded="true"]')
      ) {
        const currentActive = document.querySelector('[aria-expanded="true"]');
        currentActive.nextElementSibling.setAttribute('hidden', 'true');
        currentActive.setAttribute(
          'aria-label',
          currentActive.getAttribute('data-text-for-show')
        );
        currentActive.setAttribute('aria-expanded', 'false');
      }
      // open current clicked menu
      e.target.setAttribute('aria-expanded', 'true');
      e.target.setAttribute(
        'aria-label',
        e.target.getAttribute('data-text-for-hide')
      );
      e.target.nextElementSibling.removeAttribute('hidden');
    }
  }

  return (
    <div>
      <header className="header" role="banner">
        <div className="container">
          <div className="header__brand">
            <Link href="/">
              <a>
                <img className="brand_logo" src="/assets/images/oci_logo.png" alt="oci logo"></img>
                {/* <h1>Public Procurement</h1> */}
              </a>
            </Link>
            {/* <span className="header__divider" />
            <h2>Assam</h2> */}
          </div>

          <nav className="navbar">
            <h2 className="sr-only">Navigation menu</h2>
            <ul className="navbar__container">
              {navList.map((navItem: any, index: number) => (
                <li key={`navItemMobile-${index}`} className="navbar__links">
                  {navItem.hasSubMenu ? (
                    <>
                      <button
                        className="navbar__item"
                        type="button"
                        aria-controls="submenu__resources"
                        aria-expanded="false"
                        aria-label={`Show ${navItem.name} menu`}
                        data-text-for-show={`Show ${navItem.name} menu`}
                        data-text-for-hide={`Hide ${navItem.name} menu`}
                        onClick={navButtonHandler}
                      >
                        {navItem.name}
                      </button>
                      <ul className="navbar__nested" hidden>
                        {navItem.subMenu.map(
                          (subMenuItem: any, index: number) => (
                            <li key={`submenuItem-${index}`}>
                              <a href={subMenuItem.link}>
                                {subMenuItem.name} <span>&#x279D;</span>
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (
                    <a
                      href={navItem.link}
                      className={`navbar__item ${
                        router.pathname.includes(navItem.link)
                          ? 'navbar__item--active'
                          : ''
                      }`}
                    >
                      {navItem.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="header m-header">
        <div className="container">
          <button
            className="m-header__button"
            type="button"
            aria-expanded="false"
            aria-label="Expand navigation"
            onClick={mobileNavHandler}
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>

          <div className="header__brand">
            <Link href="/">
              <a>
                <h1>OCI - Assam</h1>
              </a>
            </Link>
            <span className="header__divider" />
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.77159 5.33331C6.42507 5.33331 5.3335 6.42489 5.3335 7.77141V20.7746C5.3335 22.1211 6.42507 23.2127 7.77159 23.2127H24.2287C25.5753 23.2127 26.6668 22.1211 26.6668 20.7746V7.77141C26.6668 6.42489 25.5753 5.33331 24.2287 5.33331H7.77159ZM17.1379 11.2959C17.1379 11.1973 17.0645 11.1063 16.9456 11.0577C16.8267 11.0092 16.6808 11.0105 16.5637 11.0612L12.8611 12.6631H11.4491C10.8214 12.6631 10.3113 13.0298 10.3113 13.4838V15.6717C10.3113 16.1257 10.8214 16.4924 11.4491 16.4924H12.8611L16.5637 18.0944C16.6808 18.1451 16.8267 18.1464 16.9456 18.0978C17.0645 18.0492 17.1379 17.9582 17.1379 17.8596V11.2959ZM20.9305 11.5695V17.5903H21.6891V11.5695H20.9305ZM19.4135 16.4956V12.6642H20.172V16.4956H19.4135ZM17.8965 13.7589V15.4009H18.655V13.7589H17.8965ZM21.6891 26.6666H10.3113V25.2444H21.6891V26.6666Z"
                fill="white"
                fillOpacity="0.7"
              />
            </svg>
          </div>
        </div>
      </header>

      <Modal
        isOpen={navIsOpen}
        onRequestClose={mobileNavHandler}
        className="dialog dialog--menu"
        overlayClassName="dialog__backdrop"
        closeTimeoutMS={200}
        aria={{
          labelledby: 'mobileMenu',
        }}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        <nav className="m-navbar">
          <div className="m-navbar__header">
            <h2 id="mobileMenu">Menus</h2>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={mobileNavHandler}
            >
              &#x78;
            </button>
          </div>

          <ul className="m-navbar__container">
            {navList.map((navItem: any, index: number) => (
              <li key={`navItemMobile-${index}`} className="navbar__links">
                {navItem.hasSubMenu ? (
                  <>
                    <button
                      className="navbar__item"
                      type="button"
                      aria-controls="submenu__resources"
                      aria-expanded="false"
                      aria-label={`Show ${navItem.name} menu`}
                      data-text-for-show={`Show ${navItem.name} menu`}
                      data-text-for-hide={`Hide ${navItem.name} menu`}
                      onClick={navButtonHandler}
                    >
                      {navItem.name}
                    </button>
                    <ul className="m-navbar__nested" hidden>
                      {navItem.subMenu.map(
                        (subMenuItem: any, index: number) => (
                          <li key={`submenuItem-${index}`}>
                            <a
                              href={subMenuItem.link}
                              onClick={mobileNavHandler}
                            >
                              {subMenuItem.name} <span>&#x279D;</span>
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                ) : (
                  <a
                    href={navItem.link}
                    onClick={mobileNavHandler}
                    className={`navbar__item ${
                      router.pathname.includes(navItem.link)
                        ? 'navbar__item--active'
                        : ''
                    }`}
                  >
                    {navItem.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Modal>
    </div>
  );
};

export default Nav;
