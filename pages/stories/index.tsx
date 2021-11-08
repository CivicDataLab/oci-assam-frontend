import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { initializeApollo } from 'lib/apolloClient';
import MegaHeader from 'components/_shared/MegaHeader';
import Parser from 'rss-parser';
import StoriesCard from 'components/stories/StoriesCard';

const parser = new Parser();

const Stories = ({ data }) => {
  const headerData = {
    title: 'Data Stories',
    content:
      'This page shows the public procurement data of the last 5 financial years for the contracts over INR 50 lakh value. One could download the total compiled data or explore specific tender groups using various filters like financial year, tendering organization, tender status, tender types, etc.',
  };
  return (
    <>
      <Head>
        <title>OCI - Assam | Stories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="stories">
        <MegaHeader data={headerData} />

        <div className="stories__wrapper container">
          {data.items.length > 0 && (
            <>
              <StoriesCard data={data.items[0]} />
              <section className="stories__team">
                <h3 className="heading-w-line">Stories from our team</h3>
                <div>
                  {data.items.map((story, index) => {
                    if (index == 0) return;
                    return <StoriesCard key={`story-${index}`} data={story} />;
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await parser.parseURL('https://medium.com/feed/civicdatalab');

  // const query = context.query || {};
  // const data = useMediumFeed('civicdatalab');
  // const variables = utils.convertToCkanSearchQuery(query);

  const apolloClient = initializeApollo();

  // const { data, loading } = await apolloClient.query({
  //   query: SEARCH_QUERY,
  //   variables,
  // });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data,
    },
  };
};

export default Stories;
