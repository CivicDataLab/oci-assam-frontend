import Head from 'next/head';
import HomeSearch from 'components/home/HomeSearch';
import Carousel from 'components/home/Carousel';
import Image from 'next/image';
import indiaMap from '/public/assets/images/india_map.png';
import Link from 'next/link';

const carosuelData = [
  {
    content:
      '“Public procurement” or what is more commonly known as the government tenders, is the process of buying of goods, services, and works by the government. It is a crucial strategic function for public services delivery, good governance, and to support growth of the economy and contributes to a large part of government spending.',
  },
  {
    link: 'https://finance.assam.gov.in/sites/default/files/swf_utility_folder/departments/agriculture_com_oid_2/portlet/level_1/files/the_assam_public_procurement_rules_2020_-_ocr_friendly.pdf',
    content:
      'The Assam Public Procurement Rules, which were approved by the cabinet in September 2020 have now been brought into force with effect from 1st September 2021.',
  },
  {
    content:
      'Assam has a robust institutional mechanism for implementing procurement reforms with a State Procurement Facilitation Cell (SPFC) headed by Commissioner, Finance, a dedicated e-procurement support cell and a procurement shared services team.',
  },
  {
    content:
      'The Assam Government fixed a mandatory e-procurement threshold of Rs.20 Lakh in 2016 which was increased to Rs.50 Lakh in the year 2018 and brought down again to Rs.25 Lakh with certain exceptions in 2021.',
  },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>Assam Public Procurement Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="home">
        <div className="home__header">
          <div className="home__bg"></div>
          <div className="container">
            <figure>
              <Image src={indiaMap} alt="" />
            </figure>
            <section>
              <h2>Assam Public Procurement Explorer</h2>
              <p>
                {
                  "Public Procurements Demystified! A tool for exploring and analyzing Assam's public procurement data for improved citizen engagement and better decision making by government officials."
                }
                <br />
                <br />
                {
                  "This dataset is contributed by the Assam Government's Finance Department."
                }
              </p>
            </section>
          </div>
        </div>

        <HomeSearch />
        <Carousel data={carosuelData} />

        <div className="home__page-links container">
          <section>
            <h2 className="heading-w-line">Data Analysis</h2>
            <Image
              width={450}
              height={450}
              src="/assets/images/bar-chart.svg"
              alt=""
              className="home__card-image"
            />
            <p>
              Data analysis feature helps view, analyze and use the procurement
              data of Assam
            </p>
            <Link href="/kpi">
              <a className="btn-primary">View Data Analysis</a>
            </Link>
          </section>
          <section>
            <h2 className="heading-w-line">Data Stories</h2>
            <Image
              width={450}
              height={450}
              src="/assets/icons/stories.jpg"
              alt=""
            />
            <p>
              Here you can see various use cases of this dataset and even share
              your own case study
            </p>
            <Link href="/stories">
              <a className="btn-primary">View Data Stories</a>
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
