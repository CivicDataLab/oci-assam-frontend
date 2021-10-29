import { GetServerSideProps } from 'next';
import { initializeApollo } from 'lib/apolloClient';
import utils from 'utils';
import Head from 'next/head';
import Search from 'components/datasets/Search';
import Total from 'components/datasets/Total';
import List from 'components/datasets/List';
import DataAlter from 'components/datasets/DataAlter';
import { SEARCH_QUERY } from 'graphql/queries';
import Pagination from 'components/datasets/Pagination';
import Filter from 'components/datasets/Filter';
import MegaHeader from 'components/_shared/MegaHeader';
import Sort from 'components/_shared/Sort';

type Props = {
  data: any;
  facets: any;
  loading: boolean;
};

const list = '"organization", "groups", "tags", "res_format"';

const Datasets: React.FC<Props> = ({ data, facets, loading }) => {
  if (loading) return <div>Loading</div>;

  const headerData = {
    title: 'Contracts Data',
    content:
      'This page shows the public procurement data of the last 5 financial years for the contracts over INR 50 lakh value. One could download the total compiled data or explore specific tender groups using various filters like financial year, tendering organization, tender status, tender types, etc.',
  };

  return (
    <>
      <Head>
        <title>OCI - Assam | Datasets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="datasets">
        <MegaHeader data={headerData} />

        <div className="datasets__wrapper container">
          <Filter data={facets} />
          {data && (
            <div className="datasets__right">
              <Search />
              <div className="datasets__total">
                <Total total={data.search.result.count} />
                <div className="datasets__sort">
                  <Sort />
                  <button className="button-link">
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
                </div>
              </div>

              <DataAlter />
              <List data={data} loading={loading} />
              <Pagination total={data.search.result.count} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const variables = utils.convertToCkanSearchQuery(query);
  const facets = await utils.getFilters(list, variables);

  const apolloClient = initializeApollo();

  const { data, loading } = await apolloClient.query({
    query: SEARCH_QUERY,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data,
      loading,
      facets,
    },
  };
};

export default Datasets;