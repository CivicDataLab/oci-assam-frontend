import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { initializeApollo } from '../lib/apolloClient';
// import Recent from '../components/home/Recent';
// import Search from 'components/datasets/Search';
import Tenders from 'components/home/Tenders';
import Carousel from 'components/home/Carousel';
import { SEARCH_QUERY } from '../graphql/queries';
import { loadNamespaces } from './_app';
import useTranslation from 'next-translate/useTranslation';

const Home: React.FC<{ locale: any; locales: any }> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t(`common:title`)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="home">
        <div className="home__header">
          <div className="container">
            <figure>
              <img src="/assets/icons/home-india.svg" alt="" />
            </figure>
            <section>
              <h2>{t(`common:title`)}</h2>
              <p>
                It is a tool where citizens can not only explore the State’s
                Public Procurements data but also analyse and see how such
                datasets can be used for the betterment of government
                processes.
                <br />
                <br />
                The data that we have here is contributed by the finance
                department, the government of Assam.
              </p>
              <a href="/" className="button-secondary">
                Call to action
              </a>
            </section>
          </div>
        </div>

        <Tenders />
        <Carousel />

        <div className="home__page-links container">
          <section>
            <h2 className="headling-w-line">Data Analysis</h2>
            <img src="/assets/icons/analysis.jpg" alt="" />
            <p>
              Data analysis feature helps you view, analyze and use the
              procurement data of Assam
            </p>
            <a className="button-primary" href="/">
              View Data Analysis
            </a>
          </section>
          <section>
            <h2 className="headling-w-line">Data Stories</h2>
            <img src="/assets/icons/stories.jpg" alt="" />
            <p>
              See stories and post done using this dataset. You can also
              contribute your own story
            </p>
            <a className="button-primary" href="/">
              View Data Stories
            </a>
          </section>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  locales,
}) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SEARCH_QUERY,
    variables: {
      sort: 'metadata_created desc',
      rows: 3,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      _ns: await loadNamespaces(['common'], locale),
      locale,
      locales,
    },
  };
};

export default Home;
