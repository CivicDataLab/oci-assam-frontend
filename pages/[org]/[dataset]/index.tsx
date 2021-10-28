import React from 'react';
import { GetServerSideProps } from 'next';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import About from 'components/dataset/About';
import Org from 'components/dataset/Org';
import Resources from 'components/dataset/Resources';
import ResourceVisualizer from 'components/viz/ResourceVisualizer';
import { initializeApollo } from 'lib/apolloClient';
import { GET_DATASET_QUERY } from 'graphql/queries';
import utils from 'utils/index';
// import { resourceGetter } from 'utils/resourceParser';

const Dataset: React.FC<{ variables: any }> = ({ variables }) => {
  const { data, error, loading } = useQuery(GET_DATASET_QUERY, { variables });
  const [resourceData, setResourceData] = React.useState<any[]>([{}]);

  if (loading) return <div>Loading</div>;

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  const dataPackage = utils.ckanToDataPackage(data.dataset.result);
  // const resource = React.useMemo(() => {
  //   return dataPackage.resources.find((resource) => resource.format === 'CSV');
  // }, [variables]);

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const data = await resourceGetter(resource.url, resource.format);
  //     setResourceData(data.slice(0, 5));
  //   };

  //   getData();
  // }, [resource]);

  return (
    <>
      <div className="container mx-auto">
        <Head>
          <title>oPub | {dataPackage.title || dataPackage.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="p-6">
          <h1 className="text-3xl font-semibold text-primary mb-2">
            {dataPackage.title || dataPackage.name}
          </h1>
          <ResourceVisualizer resourceData={resourceData} />
          <div className="mt-4">
            <h2 className="font-bold">Datset Description</h2>
            <p className="mb-4">{dataPackage.description}</p>
          </div>
          <Org variables={variables} />
          <div className="mt-4">
            <Resources variables={variables} />
          </div>
          <div>
            <h2 className="font-bold">Keywords</h2>
            <div className="flex items-center flex-wrap mt-4">
              {dataPackage.keywords.map((keyword) => (
                <div
                  className="px-2 py-1 mr-2 mb-2 bg-gray-200 text-primary rounded-md"
                  key={keyword}
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-bold">Additional Info</h2>
            <About variables={variables} />
          </div>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const variables = {
    id: context.query.dataset,
  };

  await apolloClient.query({
    query: GET_DATASET_QUERY,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      variables,
    },
  };
};

export default Dataset;
