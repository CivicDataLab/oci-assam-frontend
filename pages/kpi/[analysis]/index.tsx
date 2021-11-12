import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { initializeApollo } from 'lib/apolloClient';
// import { useQuery } from '@apollo/react-hooks';
import { GET_DATASET_QUERY } from 'graphql/queries';
import Head from 'next/head';
import utils from 'utils/index';
import MegaHeader from 'components/_shared/MegaHeader';
// import DList from 'components/_shared/DList';
import Image from 'next/image';
import Filter from 'components/datasets/Filter';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

type Props = {
  data: any;
  loading: boolean;
  facets: any;
};

const news = [
  {
    title: 'In Assam State',
    desc: 'New public procurement rules incated on 2nd Sept. Most of the tenders over the last five years were Open Tenders (98%).This indicates that most of the tenders published allowed/encouraged competition. For the National Health Mission it was about 93% with the 7% of Open Limited Tendersl.... Know more',
  },
  {
    title: 'In Assam State',
    desc: 'New public procurement rules incated on 2nd Sept. Most of the tenders over the last five years were Open Tenders (98%).This indicates that most of the tenders published allowed/encouraged competition. For the National Health Mission it was about 93% with the 7% of Open Limited Tendersl.... Know more',
  },
  {
    title: 'In Assam State',
    desc: 'New public procurement rules incated on 2nd Sept. Most of the tenders over the last five years were Open Tenders (98%).This indicates that most of the tenders published allowed/encouraged competition. For the National Health Mission it was about 93% with the 7% of Open Limited Tendersl.... Know more',
  },
  {
    title: 'In Assam State',
    desc: 'New public procurement rules incated on 2nd Sept. Most of the tenders over the last five years were Open Tenders (98%).This indicates that most of the tenders published allowed/encouraged competition. For the National Health Mission it was about 93% with the 7% of Open Limited Tendersl.... Know more',
  },
];

const list = '"organization", "groups", "res_format", "tags"';

const Analysis: React.FC<Props> = ({ data, loading, facets }) => {
  const router = useRouter();

  const { fq } = router.query;
  const [filters, setFilters] = useState(fq);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleButtonClick() {
    setModalIsOpen(!modalIsOpen);
  }

  // useEffect(() => {
  //   console.log(router);

  //   if (filters)
  //     router.push({
  //       pathname: router.pathname,
  //       query: { fq: filters },
  //     });
  // }, [filters]);

  function handleRouteChange(val: any) {
    setFilters(val.value);
  }
  useEffect(() => {
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz figure');
    utils.tabbedInterface(tablist, panels);
  }, []);

  if (loading) return <div>Loading</div>;
  const dataPackage = utils.ckanToDataPackage(data.dataset.result);

  const headerData = {
    title: dataPackage.title || dataPackage.name,
    content: dataPackage.organization.title,
    date: new Date(dataPackage.metadata_created).toLocaleDateString('en-US'),
    previousPage: 'Data Analysis',
    previousLink: '/kpi',
  };

  return (
    <>
      <Head>
        <title>OCI | {dataPackage.title || dataPackage.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" analysis">
        <MegaHeader data={headerData} />
        <div className="page-wrap container">
          <section className="analysis__heading">
            <h3 className="heading-w-line">KPI Analysis</h3>
            <button className="button-primary" onClick={handleButtonClick}>
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
              onRequestClose={handleButtonClick}
              className="dialog"
              overlayClassName="dialog__backdrop"
              contentLabel="Download Tenders"
              aria={{
                labelledby: 'dialog-head',
                describedby: 'dialog-para',
              }}
              preventScroll={true}
            >
              <section className="dialog__header">
                <div>
                  <h1 id="dialog-head">Download Tenders</h1>
                  <p id="dialog-para">
                    Select your desired option to download the tenders
                  </p>
                </div>
                <button
                  type="button"
                  className="dialog__close"
                  id="modalCancel"
                  aria-label="Close navigation"
                  onClick={handleButtonClick}
                >
                  &#x78;
                </button>
              </section>
              <section className="dialog__options">
                <label htmlFor="downloadOption1">
                  <input
                    type="radio"
                    id="downloadOption1"
                    name="dialog-option"
                    value="tender-only"
                  />
                  Download the details of this tender
                </label>

                <label htmlFor="downloadOption2">
                  <input
                    type="radio"
                    id="downloadOption2"
                    name="dialog-option"
                    value="all-details"
                  />
                  Download the details of this tender along with all the
                  attached documents
                </label>
              </section>
              <section className="dialog__format">
                <p>Choose file format</p>
                <div>
                  <label htmlFor="downloadFormat1">
                    <input
                      type="radio"
                      id="downloadFormat1"
                      name="dialog-download"
                      value="csv"
                    />
                    CSV File
                  </label>

                  <label htmlFor="downloadFormat1">
                    <input
                      type="radio"
                      id="downloadFormat2"
                      name="dialog-download"
                      value="xls"
                    />
                    XLS File
                  </label>

                  <label htmlFor="downloadFormat1">
                    <input
                      type="radio"
                      id="downloadFormat3"
                      name="dialog-download"
                      value="pdf"
                    />
                    PDF File
                  </label>

                  <label htmlFor="downloadFormat1">
                    <input
                      type="radio"
                      id="downloadFormat4"
                      name="dialog-download"
                      value="zip"
                    />
                    ZIP File
                  </label>
                </div>
              </section>
              <button
                className="button-primary dialog__submit"
                id="modalSubmit"
                onClick={handleButtonClick}
              >
                Download
              </button>
            </Modal>
          </section>

          <section className="analysis__content">
            <Filter
              data={facets}
              newFilters={handleRouteChange}
              fq={filters}
            />
            <div className="viz">
              <div className="viz__header">
                <ul className="viz__tabs">
                  <li>
                    <a href="#barGraph">
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-stroke"
                      >
                        <path
                          d="M0 14.5H15M5.5 12V6M9.5 12V3M13.5 12V0M1.5 9V12"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Bar
                    </a>
                  </li>
                  <li>
                    <a href="#lineChart">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1.5 14.5H0.75V15.25H1.5V14.5ZM7.5 5.5L8.1 5.05C7.95396 4.85528 7.7225 4.74354 7.47919 4.75029C7.23588 4.75704 7.01098 4.88145 6.87596 5.08397L7.5 5.5ZM10.5 9.5L9.9 9.95C10.0435 10.1413 10.2696 10.2527 10.5087 10.2499C10.7478 10.2472 10.9713 10.1305 11.1103 9.93593L10.5 9.5ZM0.75 0V14.5H2.25V0H0.75ZM1.5 15.25H16V13.75H1.5V15.25ZM4.12404 11.916L8.12404 5.91603L6.87596 5.08397L2.87596 11.084L4.12404 11.916ZM6.9 5.95L9.9 9.95L11.1 9.05L8.1 5.05L6.9 5.95ZM11.1103 9.93593L16.1103 2.93593L14.8897 2.06407L9.8897 9.06407L11.1103 9.93593Z" />
                      </svg>
                      Line
                    </a>
                  </li>
                </ul>
                <div className="viz__tags">
                  <span>Goods</span>
                  <span>Services</span>
                  <span>Work</span>
                </div>
              </div>
              <figure className="viz__bar" id="barGraph">
                <Image
                  src="/assets/images/bar-graph.jpg"
                  width={834}
                  height={477}
                  layout="responsive"
                />
              </figure>
              <figure className="viz__line" id="lineChart">
                <Image
                  src="/assets/images/line-chart.jpg"
                  width={834}
                  height={477}
                  layout="responsive"
                />
              </figure>
            </div>
          </section>

          <section className="analysis__news">
            <h3 className="heading-w-line">Did you know?</h3>
            <div>
              {news.map((article, index) => {
                return (
                  <article key={`article-${index}`}>
                    <h4>{article.title}</h4>
                    <p>{article.desc}</p>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const variables = {
    id: context.query.analysis,
  };
  const facets = await utils.getFilters(list, variables);

  const apolloClient = initializeApollo();

  const { data, loading } = await apolloClient.query({
    query: GET_DATASET_QUERY,
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

export default Analysis;
