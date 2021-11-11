import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { initializeApollo } from 'lib/apolloClient';
import utils from 'utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Search from 'components/datasets/Search';
import Total from 'components/datasets/Total';
import List from 'components/datasets/List';
import DataAlter from 'components/datasets/DataAlter';
import { SEARCH_QUERY } from 'graphql/queries';
import Pagination from 'components/datasets/Pagination';
import Filter from 'components/datasets/Filter';
import MegaHeader from 'components/_shared/MegaHeader';
import Sort from 'components/_shared/Sort';
import 'wicg-inert';
import Modal from 'components/_shared/Modal';

type Props = {
  data: any;
  facets: any;
  loading: boolean;
};

const list = '"organization", "groups", "res_format", "tags"';

const Datasets: React.FC<Props> = ({ data, facets, loading }) => {
  if (loading) return <div>Loading</div>;
  const router = useRouter();
  const { q, sort, size, fq, from } = router.query;
  const [search, setSearch] = useState(q);
  const [sorts, setSorts] = useState(sort);
  const [items, setItems] = useState(size);
  const [filters, setFilters] = useState(fq);
  const [pages, setPages] = useState(from);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { fq: filters, q: search, sort: sorts, size: items, from: pages },
    });
  }, [filters, search, sorts, pages, items]);

  function handleRouteChange(val: any) {
    switch (val.query) {
      case 'q':
        setSearch(val.value);
        break;
      case 'sort':
        setSorts(val.value);
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

  function createDialog() {
    const unique = +new Date();

    // create dialog
    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-labelledby', `q-${unique}`);
    dialog.innerHTML = `
    <p class="message" id="q-${unique}">${'question'}</p>
    <div class="buttons>
      <button class="okay">OK</button>
      <button class="cancel">Cancel</button>
    </div>
    `;

    document.body.appendChild(dialog);

    const elems = document.getElementById('__next');
    elems.setAttribute('inert', '');
    // Array.prototype.forEach.call(elems, (elem) => {
    //   elem.setAtrribute('inert', 'inert');
    // });
  }

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
          <Filter data={facets} newFilters={handleRouteChange} fq={filters} />
          {data && (
            <div className="datasets__right">
              <h2 className="heading-w-line">Browse Contracts</h2>
              <Search newSearch={handleRouteChange} />
              <div className="datasets__total">
                <Total text="contracts" total={data.search.result.count} />
                <div className="datasets__sort">
                  <Sort newSort={handleRouteChange} />
                  <button className="button-primary" onClick={Modal}>
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
              <Pagination
                total={data.search.result.count}
                newPage={handleRouteChange}
              />
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
