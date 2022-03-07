import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  convertToCkanSearchQuery,
  getFilters,
  fetchDatasets,
} from 'utils/index';
import Head from 'next/head';
import Search from 'components/datasets/Search';
import Total from 'components/datasets/Total';
import DataAlter from 'components/datasets/DataAlter';
import Filter from 'components/datasets/Filter';
import MegaHeader from 'components/_shared/MegaHeader';
import Carousel from 'components/home/Carousel';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  data: any;
  facets: any;
};

const list = '"tags"';

const carosuelData = [
  {
    content:
      'NHM topped the goods procurements during the period of 2016 - 2020. It received a total of 1372 bids through the e-procurement portal and awarded contracts amounting to Rs.1626.44 Crore.',
  },
  {
    content:
      'A total of 68 procuring entities received less than 2 bids on an average against a total of 3836 tenders floated by them during 2016 - 2020.',
  },
  {
    content:
      'Out of a total of 30,294 tenders, information pertaining to Award of Contracts was published for 8295 tenders during 2016- 2020.',
  },
];

const Datasets: React.FC<Props> = ({ data, facets }) => {
  const router = useRouter();
  const { results, count } = data.result;
  const { q, size, fq, from } = router.query;
  const [search, setSearch] = useState(q);
  const [items, setItems] = useState(size);
  const [filters, setFilters] = useState(fq);
  const [pages, setPages] = useState(from);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { fq: filters, q: search, size: items, from: pages },
    });
  }, [filters, search, pages, items]);

  function handleRouteChange(val: any) {
    switch (val.query) {
      case 'q':
        setSearch(val.value);
        break;
      case 'size':
        setItems(val.value);
        break;
      case 'fq':
        setFilters(val.value);
        break;
      case 'from':
        setPages(val.value);
        break;
    }
  }

  const headerData = {
    title: 'Data Analysis',
    content:
      'This page shows analysis of the procurement data using some Key Performing Indices. You can analyse the data using different filters and download the visuals.',
  };

  return (
    <>
      <Head>
        <title>OCI - Assam | KPIs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="kpi">
        <MegaHeader data={headerData} />
        <Carousel data={carosuelData} />

        <div className="container">
          <section className="kpi__heading">
            <h2 className="heading-w-line">
              Browse Key Performance Indicators
            </h2>
            <p className="kpi__explain">
              Here is a list of common indicators for an initial analysis of
              the public procurement data, providing key information on
              different aspects of the contracting process. The main indicators
              proposed describe the level of competition and the internal
              efficiency of the processes, and signal potential risks and areas
              of improvement.
            </p>
          </section>
          <div className="kpi__wrapper">
            <Filter
              data={facets}
              newFilters={handleRouteChange}
              fq={filters}
            />
            {data && (
              <div>
                <Search text="Search KPIs" newSearch={handleRouteChange} />
                <div className="datasets__total">
                  <Total text="results" total={count} />
                </div>

                <DataAlter
                  data={facets}
                  newData={handleRouteChange}
                  fq={filters}
                  sortShow={false}
                />
                <ul className="kpi__list">
                  {results.map((datapackage: any, index: number) => (
                    <li key={`list-${index}`} className="kpi-item">
                      <Link href={`${router.pathname}/${datapackage.name}`}>
                        <a className="kpi-item__link">
                          <section>
                            <h3 className="kpi-item__heading">
                              {datapackage.title}
                            </h3>
                            <p className="kpi-item__desc">
                              {datapackage.notes}
                            </p>
                            <ul className="kpi-item__tags">
                              {datapackage.tags.length > 0 &&
                                datapackage.tags.map((tag, index) => (
                                  <li
                                    key={tag.display_name}
                                    data-id={`tag-${index}`}
                                  >
                                    {tag.display_name}
                                  </li>
                                ))}
                            </ul>
                          </section>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query || {};
  const variables = convertToCkanSearchQuery(query);
  const facets = await getFilters(list, variables, 'kpi_dataset');

  const data = await fetchDatasets('kpi_dataset', variables);

  return {
    props: {
      data,
      facets,
    },
  };
};

export default Datasets;
