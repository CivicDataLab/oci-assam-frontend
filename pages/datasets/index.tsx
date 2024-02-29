import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  getFilters,
  convertToCkanSearchQuery,
  fetchDatasets,
} from 'utils/index';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Search from 'components/datasets/Search';
import Total from 'components/datasets/Total';
import List from 'components/datasets/List';
import DataAlter from 'components/datasets/DataAlter';
import Pagination from 'components/datasets/Pagination';
import Filter from 'components/datasets/Filter';
import MegaHeader from 'components/_shared/MegaHeader';
import Sort from 'components/_shared/Sort';
import Modal from 'react-modal';
import { download_data } from 'utils/download_data';
import { event } from '../../utils/ga';
import { defaultSort, filterList } from 'components/datasets/data';

Modal.setAppElement('#__next');

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [downloadMethod, setDownloadMethod] = useState('download-current');
  const [downloadType, setDownloadType] = useState('json');

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

  function handleModalClick() {
    setModalIsOpen(!modalIsOpen);
    setDownloadType('json');
    setDownloadMethod('download-current');
  }

  function handleDownloadClick() {
    setModalIsOpen(!modalIsOpen);
    if (downloadMethod === 'download-current') {
      download_data(results);
    } else {
      if (downloadType === 'xlsx')
        window.open(
          'https://raw.githubusercontent.com/CivicDataLab/assam-tenders-data/main/data/ProcessedData/ocds-mapped-data/current/ocds_mapped_data.xlsx.zip'
        );
      else
        window.open(
          'https://raw.githubusercontent.com/CivicDataLab/assam-tenders-data/main/data/ProcessedData/ocds-mapped-data/current/ocds_mapped_data.json.zip'
        );
    }

    event({
      action: 'download',
      params: {
        method: downloadMethod,
      },
    });
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
                  <button
                    id="modalTrigger"
                    className="btn-primary"
                    onClick={() => handleModalClick()}
                  >
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
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleModalClick}
                    className="dialog dialog--download"
                    overlayClassName="dialog__backdrop"
                    contentLabel="Download Tenders"
                    aria={{
                      labelledby: 'dialog-head',
                      describedby: 'dialog-para',
                    }}
                    preventScroll={true}
                    htmlOpenClassName="ReactModal__Html--open"
                  >
                    <section className="dialog__header">
                      <div>
                        <h1 id="dialog-head">Download Contracts</h1>
                        <p id="dialog-para">
                          Select your desired options to download the Contracts
                        </p>
                      </div>
                      <button
                        type="button"
                        className="dialog__close"
                        id="modalCancel"
                        aria-label="Close navigation"
                        onClick={handleModalClick}
                      >
                        &#x78;
                      </button>
                    </section>
                    <section className="dialog__body">
                      <fieldset
                        onChange={(e: any) =>
                          setDownloadMethod(e.target.value)
                        }
                      >
                        <label htmlFor="download-current">
                          <input
                            type="radio"
                            id="download-current"
                            name="download-option"
                            value="download-current"
                            defaultChecked
                          />
                          Download the contracts shown on this page
                        </label>

                        <label htmlFor="download-all">
                          <input
                            type="radio"
                            id="download-all"
                            name="download-option"
                            value="download-all"
                          />
                          Download all Contracts
                          <span className="text-xs ml-1 text-slate-600">
                            (zipped)
                          </span>
                        </label>
                      </fieldset>
                      <div className="dialog__format">
                        <p>Choose file format</p>
                        <div>
                          <fieldset
                            onChange={(e: any) =>
                              setDownloadType(e.target.value)
                            }
                          >
                            <label htmlFor="downloadFormat2">
                              <input
                                type="radio"
                                id="downloadFormat2"
                                name="dialog-download"
                                value="json"
                                defaultChecked
                              />
                              JSON File{' '}
                              {downloadMethod === 'download-all' ? (
                                <span>(~13.4MB)</span>
                              ) : null}
                            </label>

                            <label htmlFor="downloadFormat1">
                              <input
                                type="radio"
                                id="downloadFormat1"
                                name="dialog-download"
                                value="xlsx"
                                disabled={downloadMethod !== 'download-all'}
                              />
                              XLSX File
                              {downloadMethod === 'download-all' ? (
                                <span>(~16.5MB)</span>
                              ) : null}
                              {downloadMethod !== 'download-all' ? (
                                <span className="text-xs">
                                  (Not supported)
                                </span>
                              ) : null}
                            </label>
                          </fieldset>
                        </div>
                      </div>
                    </section>
                    <button
                      className="btn-primary dialog__submit"
                      id="modalSubmit"
                      onClick={() => handleDownloadClick()}
                    >
                      Download
                    </button>
                  </Modal>
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
