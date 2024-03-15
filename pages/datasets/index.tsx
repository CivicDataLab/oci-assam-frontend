import MegaHeader from 'components/_shared/MegaHeader';
import Sort from 'components/_shared/Sort';
import DataAlter from 'components/datasets/DataAlter';
import { DownloadDataset } from 'components/datasets/DownloadDataset';
import Filter from 'components/datasets/Filter';
import List from 'components/datasets/List';
import Pagination from 'components/datasets/Pagination';
import Search from 'components/datasets/Search';
import Total from 'components/datasets/Total';
import { defaultSort, filterList } from 'components/datasets/data';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  convertToCkanSearchQuery,
  fetchDatasets,
  getFilters,
} from 'utils/index';

type Props = {
  data: any;
  facets: any;
};

const Datasets: React.FC<Props> = ({ data, facets }) => {
  const router = useRouter();
  const { q, sort, size, fq, from } = router.query;
  const [search, setSearch] = useState(q);
  const [sorts, setSorts] = useState(sort);
  const [items, setItems] = useState(size);
  const [datsetsFilters, setDatasetsFilters] = useState(fq);
  const [pages, setPages] = useState(from);

  const { results, count } = data.result;
  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          fq: datsetsFilters,
          q: search,
          sort: sorts,
          size: items,
          from: pages,
        },
      },
      undefined
    );
  }, [datsetsFilters, search, sorts, pages, items]);

  function handleDatasetsChange(val: any) {
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
        setDatasetsFilters(val.value);
        break;
      case 'from':
        setPages(val.value);
        break;
    }
  }

  const headerData = {
    title: 'Contracts Data',
    content:
      'This page shows the public procurement data of the last 5 financial years for the state of Assam for the contracts over INR 50 lakh value. You can download the total compiled data or explore specific tender groups using the filters like financial year, tendering organization, tender status, tender types, etc.',
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
          <Filter
            data={facets}
            newFilters={handleDatasetsChange}
            fq={datsetsFilters}
          />
          {data && (
            <div className="datasets__right">
              <h2 className="heading-w-line">Browse Contracts</h2>
              <div className="total-datasets mt-2">
                Last Updated: <time dateTime="2024-02-27">27 Feb, 2024</time>
              </div>
              <Search newSearch={handleDatasetsChange} />
              <div className="datasets__total">
                <Total text="contracts" total={count} />

                <div className="datasets__sort">
                  <Sort
                    newSort={handleDatasetsChange}
                    defaultSort={defaultSort}
                  />
                  <DownloadDataset results={results} />
                </div>
              </div>

              <DataAlter
                data={facets}
                newData={handleDatasetsChange}
                fq={datsetsFilters}
                sortShow={true}
                defaultSort={defaultSort}
              />
              <List data={results} />
              <Pagination total={count} newPage={handleDatasetsChange} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get queries from url
  const query = context.query || {};

  // if no sort in url, use a default sort
  if (!query.sort) query.sort = defaultSort;

  // format queries from url into an object
  const variables = convertToCkanSearchQuery(query);
  console.log(variables, '----', query);

  // fetch fatcets values
  const facets = await getFilters(filterList, variables, 'tender_dataset');

  // fetch datasets
  const data = await fetchDatasets('tender_dataset', variables);
  return {
    props: {
      data,
      facets,
    },
  };
};

export default Datasets;
