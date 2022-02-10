import { useEffect } from 'react';
import Layout from 'components/layout/layout';
import Router from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import '../styles/style.css';

type Props = {
  Component: any;
  pageProps: any;
};

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteComplete = () => {
      // change focus to top
      if (document.querySelector('#top-of-site-pixel-anchor')) {
        (
          document.querySelector(
            '#top-of-site-pixel-anchor'
          ) as HTMLInputElement
        ).focus();
      }
    };

    const handleRouteStart = () => {
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
    };

    Router.events.on('routeChangeComplete', handleRouteComplete);
    Router.events.on('routeChangeStart', handleRouteStart);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteComplete);
      Router.events.on('routeChangeStart', handleRouteStart);
    };
  });

  return (
    <Layout>
      <NextNprogress
        color="#0899A0"
        startPosition={0.3}
        stopDelayMs={100}
        height={3}
        options={{ easing: 'ease', speed: 300, showSpinner: false }}
      />
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
