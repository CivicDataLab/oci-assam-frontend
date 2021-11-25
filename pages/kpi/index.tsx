import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
// import { initializeApollo } from 'lib/apolloClient';
import {
  convertToCkanSearchQuery,
  getFilters,
  fetchDatasets,
} from 'utils/index';
import Head from 'next/head';
import Search from 'components/datasets/Search';
import Total from 'components/datasets/Total';
import DataAlter from 'components/datasets/DataAlter';
// import { SEARCH_QUERY } from 'graphql/queries';
import Pagination from 'components/datasets/Pagination';
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
      'This page shows the public procurement data of the last 5 financial years for the contracts over INR 50 lakh value. One could download the total compiled data or explore specific tender groups using various filters like financial year, tendering organization, tender status, tender types, etc.',
  };

  return (
    <>
      <Head>
        <title>OCI - Assam | Datasets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="datasets kpi">
        <MegaHeader data={headerData} />
        <Carousel />

        <div className="datasets__wrapper container">
          <Filter data={facets} newFilters={handleRouteChange} fq={filters} />
          <section className="kpi__summary">
            <h3 className="heading3-w-line">Filtered summary</h3>

            <strong>31.4kCr</strong>
            <p>Total number of tenders published</p>

            <strong>103kr</strong>
            <p>Total number of bids received</p>

            <strong>₹ 31.4kCr</strong>
            <p>Total value of tenders awarded</p>
          </section>
          {data && (
            <div className="datasets__right">
              <h2 className="heading-w-line">
                Browse Key Performance Indicators
              </h2>
              <p className="kpi__explain">
                This Text should explain what a KPI is and inform the user that
                they can click on the cards below and analyse them.
              </p>
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
              <ul className="list kpi__list">
                {results.map((datapackage: any, index: number) => (
                  <li key={`list-${index}`} className="kpi__item">
                    <Link href={`${router.pathname}/${datapackage.name}`}>
                      <a className="kpi__link">
                        <section>
                          <h3 className="kpi__heading">{datapackage.title}</h3>
                          <p className="kpi__desc">{datapackage.notes}</p>
                          <ul className="kpi__tags">
                            <li data-id="coverage">Coverage</li>
                            <li data-id="value">Value for money</li>
                            <li data-id="market">Market participation</li>
                            <li data-id="competetion">Competetion</li>
                          </ul>
                        </section>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <Pagination total={count} newPage={handleRouteChange} />
            </div>
          )}
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
