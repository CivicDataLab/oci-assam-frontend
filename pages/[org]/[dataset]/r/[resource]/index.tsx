import React from 'react';
import { GetServerSideProps } from 'next';
import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import { initializeApollo } from '../../../../../lib/apolloClient';
import Nav from '../../../../../components/_shared/Nav';
import About from '../../../../../components/resource/About';
import { GET_RESOURCES_QUERY } from '../../../../../graphql/queries';
import { IResource } from '../../../../../types/Resource';
// import { resourceGetter } from '../../../../../utils/resourceParser';

const ResourcePage: React.FC<{ variables: any }> = ({ variables }) => {
  const { data, loading } = useQuery(GET_RESOURCES_QUERY, {
    variables,
    notifyOnNetworkStatusChange: true,
  });
  // const [resourceData, setResourceData] = React.useState<any[]>([{}]);

  if (loading) return <div>Loading</div>;

  const result = data.dataset.result;

  const resource: IResource = React.useMemo(() => {
    return result.resources.find(
      (item: IResource) => item.name === variables.resource
    );
  }, [variables]);

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const data = await resourceGetter(resource.url, resource.format);
  //     setResourceData(data.slice(0, 10));
  //   };

  //   getData();
  // }, [resource]);

  return (
    <>
      <div className="container mx-auto">
        <Head>
          <title>Portal | {resource.title || resource.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="p-6">
          <h1 className="text-3xl font-semibold text-primary mb-2">
            {resource.title || resource.name}
          </h1>
          <About variables={variables} />
          {resource.format === 'PDF' ? (
            <iframe
              src={resource.url}
              title={resource.name}
              style={{ height: window.innerHeight / 1.4 }}
              className="w-2/3 mx-auto"
            ></iframe>
          ) : null}
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const variables = {
    id: context.query.dataset,
    resource: context.query.resource,
  };

  await apolloClient.query({
    query: GET_RESOURCES_QUERY,
    variables,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      variables,
    },
  };
};

export default ResourcePage;
