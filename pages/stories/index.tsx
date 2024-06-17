import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import MegaHeader from 'components/_shared/MegaHeader';
import StoriesCard from 'components/stories/StoriesCard';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

const Stories = ({ data }) => {
  const headerData = {
    title: 'Data Stories',
    content:
      'This page contains different researches, case studies, explainers and other public resources using procurement data.',
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
          {data?.rss?.channel[0]?.item?.length > 0 && (
            <>
              <StoriesCard data={data.rss.channel[0].item[0]} length={700} />
              <section className="stories__team">
                <div className="stories__header">
                  <h3 className="heading-w-line">Stories from our team</h3>
                </div>
                <div className="stories__wrapper">
                  {data.rss.channel[0].item.slice(1).map((story, index) => (
                    <StoriesCard key={`story-${index}`} data={story} length={125} />
                  ))}
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
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=59');

  try {
    const response = await fetch(
      'https://medium.com/feed/civicdatalab/tagged/open-contracting'
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const xmlData = await response.text();
    const jsonData = await parseStringPromise(xmlData);

    return {
      props: {
        data: jsonData,
      },
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      props: {
        data: null,
      },
    };
  }
};

export default Stories;
