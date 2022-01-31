import { GetServerSideProps } from 'next';
import Head from 'next/head';
import HomeSearch from 'components/home/HomeSearch';
import Carousel from 'components/home/Carousel';
import { loadNamespaces } from './_app';
import useTranslation from 'next-translate/useTranslation';

const carosuelData = [
  {
    content:
      '“Public procurement” or what is more commonly known as the government tenders, is the process of buying of goods, services, and works by the government. It is a crucial strategic function for public services delivery, good governance, and to support growth of the economy and contributes to a large part of government spending',
  },
  {
    link: 'https://finance.assam.gov.in/sites/default/files/swf_utility_folder/departments/agriculture_com_oid_2/portlet/level_1/files/the_assam_public_procurement_rules_2020_-_ocr_friendly.pdf',
    content:
      'The Assam Public Procurement Rules, which were approved by the cabinet in September 2020 have now been brought into force with effect from 1st September 2021.',
  },
];

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
                It is a tool where both Government and Citizens can not only
                explore the State’s Public Procurements data but also analyse
                and see how such datasets can be used for the betterment of
                Government processes.
                <br />
                <br />
                The data that we have here is contributed by the Finance
                Department, the Government of Assam.
              </p>
            </section>
          </div>
        </div>

        <HomeSearch />
        <Carousel data={carosuelData} />

        <div className="home__page-links container">
          <section>
            <h2 className="heading-w-line">Data Analysis</h2>
            <img src="/assets/icons/analysis.jpg" alt="" />
            <p>
              Data analysis feature helps view, analyze and use the procurement
              data of Assam
            </p>
            <a className="btn-primary" href="/kpi">
              View Data Analysis
            </a>
          </section>
          <section>
            <h2 className="heading-w-line">Data Stories</h2>
            <img src="/assets/icons/stories.jpg" alt="" />
            <p>
              Here you can see various use cases of this dataset and even share
              your own case study
            </p>
            <a className="btn-primary" href="/stories">
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
  return {
    props: {
      _ns: await loadNamespaces(['common'], locale),
      locale,
      locales,
    },
  };
};

export default Home;
