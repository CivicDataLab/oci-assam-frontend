import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import { useQuery } from '@apollo/react-hooks';
import utils from '../utils';
import Head from 'next/head';
import Form from '../components/datasets/Form';
import Total from '../components/datasets/Total';
import List from '../components/datasets/List';
import DataAlter from '../components/datasets/DataAlter';
import { ErrorMessage } from '../components/_shared';
import { SEARCH_QUERY } from '../graphql/queries';
import Pagination from '../components/datasets/Pagination';
import Filter from '../components/datasets/Filter';

type Props = {
  variables: any;
};

const Search: React.FC<Props> = ({ variables }) => {
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading search results." />;
  if (loading) return <div>Loading</div>;

  return (
    <>
      <Head>
        <title>HAQ-GEST | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="datasets container">
        <div className="datasets__wrapper">
          <Filter />
          <div className="datasets__right">
            <Form />
            <Total total={data.search.result.count} />
            <DataAlter />
            <List variables={variables} />
            <Pagination total={data.search.result.count} />
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const variables = utils.convertToCkanSearchQuery(query);

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SEARCH_QUERY,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      variables,
    },
  };
};

export default Search;
