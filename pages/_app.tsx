import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '../lib/apolloClient';
import Layout from 'components/layout/layout';
import I18nProvider from 'next-translate/I18nProvider';
import Router, { useRouter } from 'next/router';
import '../styles/style.css';

interface I8nObject {
  [property: string]: any;
}

export async function loadNamespaces(
  namespaces: string[],
  lang: string
): Promise<I8nObject> {
  const res = {};
  for (const ns of namespaces) {
    res[ns] = await import(`../locales/${lang}/${ns}.json`).then(
      (m) => m.default
    );
  }
  return res;
}

type Props = {
  Component: any;
  pageProps: any;
};

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();

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

    // const handleRouteStart = () => {
    //   if (document.querySelector('.ReactModal__Body--open')) {

    //   }
    // };

    Router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteComplete);
    };
  });

  return (
    <Layout>
      <I18nProvider lang={router.locale} namespaces={pageProps._ns}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </I18nProvider>
    </Layout>
  );
};

export default MyApp;
