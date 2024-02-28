import MegaHeader from 'components/_shared/MegaHeader';
import { ContractDetails } from 'components/datasets/ContractDetails';
import type { Tender as Type } from 'components/datasets/types';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { download_data } from 'utils/download_data';
import { event } from 'utils/ga';
import { fetchAPI } from 'utils/index';

type Props = {
  data: any;
  documents: any;
};

const Tender: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  const dataPackage: Type = data.result;

  const headerData = {
    title: dataPackage.tender[0].title,
    content: dataPackage.buyer[0].name,
    date: `${dataPackage.tender[0].datePublished || '--'} . ${
      dataPackage.tender[0].fiscalYear || '--'
    }`,
    previousPage: 'Contracts Data',
    previousLink: '/datasets',
  };

  return (
    <>
      <Head>
        <title>{`OCI | ${dataPackage.tender[0].title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="tender">
        <MegaHeader data={headerData} />
        <div className="page-wrap container">
          <section className="tender__heading">
            <h3 className="heading-w-line">Contract Details</h3>

            <button
              className="btn-primary"
              onClick={() => {
                download_data([dataPackage]);
                event({
                  action: 'download-dataset',
                  params: {
                    path: router.pathname,
                  },
                });
              }}
            >
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
          </section>

          {dataPackage ? <ContractDetails dataPackage={dataPackage} /> : null}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchAPI(context.query.tender);

  return {
    props: {
      data,
      ids: context.query.tender,
    },
  };
};

export default Tender;
