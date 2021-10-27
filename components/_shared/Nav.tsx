/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import MegaHeader from 'components/_shared/MegaHeader';

const Nav: React.FC = () => {
  const router = useRouter();

  // opening / closing mobile navbar
  function mobileNavHandler() {
    if (document.querySelector('.m-navbar--active')) {
      document
        .querySelector('.m-navbar--active')
        .classList.remove('m-navbar--active');
      document
        .querySelector('.navbar-backdrop--active')
        .classList.remove('navbar-backdrop--active');

      document
        .querySelector('.m-header__button')
        .setAttribute('aria-expanded', 'false');
    } else {
      document
        .querySelector('.m-header__button')
        .setAttribute('aria-expanded', 'true');
      document
        .querySelector('.navbar-backdrop')
        .classList.add('navbar-backdrop--active');
      document.querySelector('.m-navbar').classList.add('m-navbar--active');
    }
    document.querySelector('body').classList.toggle('scroll-stop');
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
    <>
      <div className="navbar-backdrop" />
      <header className="header" role="banner">
        <div className="container">
          <div className="header__brand">
            <Link href="/">
              <a>
                <h1>Public Procurement Explorer</h1>
              </a>
            </Link>
            <span className="header__divider" />
            <h2>Assam</h2>
          </div>

          <nav className="navbar">
            <h2 className="sr-only">Navigation menu</h2>
            <ul className="navbar__container">
              <li className="navbar__links">
                <Link href="/datasets">
                  <a
                    className={`navbar__item ${
                      router.pathname == '/datasets'
                        ? 'navbar__item--active'
                        : ''
                    }`}
                  >
                    Contracts Data
                  </a>
                </Link>
              </li>
              <li className="navbar__links">
                <Link href="/">
                  <a className="navbar__item">Data Analysis</a>
                </Link>
              </li>
              <li className="navbar__links">
                <Link href="/">
                  <a className="navbar__item">Data Stories</a>
                </Link>
              </li>
              <li className="navbar__links">
                <Link href="/">
                  <a className="navbar__item">Forum</a>
                </Link>
              </li>
              <li className="navbar__links">
                <Link href="/">
                  <a className="navbar__item">About Us</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <MegaHeader />
      </header>

      {/* Mobile Header */}
      <header className="header m-header">
        <div className="m-header__container">
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
                <h1>HAQ - GEST</h1>
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
        <MegaHeader />
      </header>

      <nav className="m-navbar">
        <div className="m-navbar__header">
          <h2>Menus</h2>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={mobileNavHandler}
          >
            &#x78;
          </button>
        </div>

        <ul className="m-navbar__container">
          <li className="m-navbar__links">
            <Link href="/">
              <a className="m-navbar__item">Home</a>
            </Link>
          </li>
          <li className="m-navbar__links">
            <Link href="/">
              <a className="m-navbar__item">Data Catalogue</a>
            </Link>
          </li>
          <li className="m-navbar__links">
            <button
              className="m-navbar__item"
              type="button"
              aria-expanded="false"
              aria-label="Show Data Explorer menu"
              data-text-for-show="Show Data Explorer menu"
              data-text-for-hide="Hide Data Explorer menu"
              onClick={navButtonHandler}
            >
              Data Explorer
            </button>
            <ul className="m-navbar__nested" hidden>
              <li>
                <a href="#">
                  Budget Summary <span>&#x279D;</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Schemes <span>&#x279D;</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Data Story <span>&#x279D;</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="m-navbar__links">
            <button
              className="m-navbar__item"
              type="button"
              aria-expanded="false"
              aria-label="Show Data Explorer menu"
              data-text-for-show="Show Data Explorer menu"
              data-text-for-hide="Hide Data Explorer menu"
              onClick={navButtonHandler}
            >
              Resources
            </button>
            <ul className="m-navbar__nested" hidden>
              <li>
                <a href="#">
                  The Team <span>&#x279D;</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Glossary <span>&#x279D;</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
