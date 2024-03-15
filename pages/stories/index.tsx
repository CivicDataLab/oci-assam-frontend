import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import MegaHeader from 'components/_shared/MegaHeader';
import StoriesCard from 'components/stories/StoriesCard';

const Stories = ({ data }) => {
  const headerData = {
    title: 'Data Stories',
    content:
      'This page contains different researches, case studies, explainers and other public resources using  procurement data.',
  };
  return (
    <>
      <Head>
        <title>OCI - Assam | Stories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="stories">
        <MegaHeader data={headerData} />

        <div className="container">
          {data.items.length > 0 && (
            <>
              <StoriesCard data={data.items[0]} length={700} />
              <section className="stories__team">
                <div className="stories__header">
                  <h3 className="heading-w-line">Stories from our team</h3>
                </div>
                <div className="stories__wrapper">
                  {data.items.map((story, index) => {
                    if (index == 0) return;
                    return (
                      <StoriesCard
                        key={`story-${index}`}
                        data={story}
                        length={125}
                      />
                    );
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

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=59'
  );

  const data = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/civicdatalab/tagged/open-contracting'
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
};

export default Stories;
