import { GetServerSideProps } from 'next';
import { initializeApollo } from 'lib/apolloClient';
// import { useQuery } from '@apollo/react-hooks';
import { GET_DATASET_QUERY } from 'graphql/queries';
import Head from 'next/head';
import utils from 'utils/index';
import MegaHeader from 'components/_shared/MegaHeader';
import DList from 'components/_shared/DList';
import Image from 'next/image';

type Props = {
  data: any;
  loading: boolean;
};

const Tender: React.FC<Props> = ({ data, loading }) => {
  // const { data, error, loading } = useQuery(GET_DATASET_QUERY, { variables });
  // if (loading) return <div>Loading</div>;

  // if (error) {
  //   console.log(error);
  //   return <div>Error</div>;
  // }

  if (loading) return <div>Loading</div>;
  const dataPackage = utils.ckanToDataPackage(data.dataset.result);

  const headerData = {
    title: dataPackage.title || dataPackage.name,
    content: dataPackage.organization.title,
    date: new Date(dataPackage.metadata_created).toLocaleDateString('en-US'),
    previousPage: 'Contracts Data',
    previousLink: '/datasets',
  };

  const basicContent = [
    {
      title: 'Open contracting ID',
      desc: 'ocds-kjhdrl-2020_HPIPH_36980_2',
    },
    {
      title: 'Tender ID',
      desc: '2020_HPIPH_36980_2',
    },
    {
      title: 'Tender Title',
      desc: 'Tender enquiry form for rate contract for supply of ayurvedi and homeopathic medicine',
    },
    {
      title: 'Tender description',
      desc: 'Aug. and Extension of LWSS Khel Moh Bariara phase 1st 2nd 3rd in Tehsil Nurpur Distt. Kangra SH Providing and installation of centrifugal pumping machinery with allied accessories and laying jointing testing of G.I. pipe 125mm dia in Rising main for',
    },
    {
      title: 'Organisation name',
      desc: 'Health and Family Welfare Department',
    },
    {
      title: 'Tender amount',
      desc: '₹11,74,92,775',
    },
  ];

  const dateContent = [
    {
      title: 'Participation fees amount',
      desc: '250',
    },
    {
      title: 'Participation fees payment address locality',
      desc: 'Nahan',
    },
    {
      title: 'Date published',
      desc: '2020-05-06',
    },
    {
      title: 'Award period Start Date',
      desc: '2020-05-19',
    },
    {
      title: 'Document availability start date',
      desc: '2020-05-06',
    },
    {
      title: 'Document availability end date',
      desc: '2020-05-19',
    },
  ];

  const documents = [
    {
      title: 'Tender Notice',
      desc: ['Tendernotice1.Pdf', '1,388 kb', 'pdf', '#view', '#download'],
      tooltip: 'true',
    },
    {
      title: 'Bill of qualtiy',
      desc: ['BOQ78274_32737. xls', '129 kb', 'xls', '#view', '#download'],
    },
    {
      title: 'Additional documents',
      desc: ['GSo0328jd.pdf', '421 kb', 'pdf', '#view', '#download'],
      tooltip: 'true',
    },
    {
      title: 'Download all tender related documents in Zip file',
      desc: ['', '1,445 kb', 'zip', '', '#download'],
    },
  ];

  return (
    <>
      <Head>
        <title>OCI | {dataPackage.title || dataPackage.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="tender">
        <MegaHeader data={headerData} />
        <div className="page-wrap container">
          <section>
            <h3 className="headling-w-line">Contract Details</h3>
          </section>
          <button className="button-primary">
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.05967 4H6.99967V0.666667C6.99967 0.3 6.69967 0 6.33301 0H3.66634C3.29967 0 2.99967 0.3 2.99967 0.666667V4H1.93967C1.34634 4 1.04634 4.72 1.46634 5.14L4.52634 8.2C4.78634 8.46 5.20634 8.46 5.46634 8.2L8.52634 5.14C8.94634 4.72 8.65301 4 8.05967 4ZM0.333008 10.6667C0.333008 11.0333 0.633008 11.3333 0.999674 11.3333H8.99967C9.36634 11.3333 9.66634 11.0333 9.66634 10.6667C9.66634 10.3 9.36634 10 8.99967 10H0.999674C0.633008 10 0.333008 10.3 0.333008 10.6667Z"
                fill="white"
              />
            </svg>
            Download
          </button>

          <section className="tender__basic">
            <div>
              <h3 className="heading-3">Basic Info</h3>
              <DList content={basicContent} />
            </div>
            <div className="tender__map">
              <h3 className="heading-3">Map</h3>

              <figure className="tender__image">
                <Image
                  src="/assets/icons/assam.png"
                  width={450}
                  height={350}
                  layout="responsive"
                />
              </figure>
            </div>
          </section>

          <section className="tender__item">
            <h3 className="heading-3">Documents</h3>
            <DList content={documents} />
          </section>

          <section className="tender__item">
            <h3 className="heading-3">Important Dates</h3>
            <DList content={dateContent} />
          </section>

          <section className="tender__item">
            <h3 className="heading-3">Tender detail 1</h3>
            <DList content={basicContent} />
          </section>

          <section className="tender__item">
            <h3 className="heading-3">Tender detail 2</h3>
            <DList content={basicContent} />
          </section>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const variables = {
    id: context.query.details,
  };

  const { data, loading } = await apolloClient.query({
    query: GET_DATASET_QUERY,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data,
      loading,
    },
  };
};

export default Tender;
