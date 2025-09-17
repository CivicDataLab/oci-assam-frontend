import MegaHeader from 'components/_shared/MegaHeader';
import { ContractDetails } from 'components/datasets/ContractDetails';
import type { Tender as Type } from 'components/datasets/types';
import { Download } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { download_data, getFilteredData } from 'utils/download_data';
import { event } from 'utils/ga';
import { fetchAPI } from 'utils/index';

type Props = {
  data: any;
  documents: any;
};

const Tender: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  const dataPackage: Type = data.result;
  console.log(dataPackage);
  const headerData = {
    title: dataPackage && dataPackage.tender && dataPackage.tender[0] && dataPackage.tender[0].title,
    content: dataPackage && dataPackage.buyer && dataPackage.buyer[0] && dataPackage.buyer[0].name,
    date: `${(dataPackage && dataPackage.tender && dataPackage.tender[0] && dataPackage.tender[0].datePublished) || '--'} . ${(dataPackage && dataPackage.tender && dataPackage.tender[0] && dataPackage.tender[0].fiscalYear) || '--'
      }`,
    previousPage: 'Contracts Data',
    previousLink: '/datasets',
  };

  return (
    <>
      <Head>
        <title>{`OCI | ${dataPackage && dataPackage.tender && dataPackage.tender[0] && dataPackage.tender[0].title || 'Tender Details'}`}</title>
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
                download_data(getFilteredData([dataPackage]));
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
