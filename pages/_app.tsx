import Layout from 'components/layout/layout';
import { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import { useEffect } from 'react';
import '../styles/style.css';
import { pageview } from '../utils/ga';

type Props = {
  Component: any;
  pageProps: any;
};

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteComplete = (url) => {
      // track pageview with google analytics
      pageview(url);

      // change focus to top
      if (document.querySelector('#top-of-site-pixel-anchor')) {
        (
          document.querySelector(
            '#top-of-site-pixel-anchor'
          ) as HTMLInputElement
        ).focus();
      }
    };

    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, [router]);

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
