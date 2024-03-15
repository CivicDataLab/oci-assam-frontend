import MegaHeader from 'components/_shared/MegaHeader';
import { ContractDetails } from 'components/datasets/ContractDetails';
import type { Tender as Type } from 'components/datasets/types';
import { Download } from 'lucide-react';
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
              <Download size={18} />
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
