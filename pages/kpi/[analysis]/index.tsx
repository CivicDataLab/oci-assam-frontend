import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { tabbedInterface, ckanToDataPackage, fetchAPI } from 'utils/index';
import MegaHeader from 'components/_shared/MegaHeader';
import Indicator from 'components/analytics/Indicator';
import Modal from 'react-modal';
import { resourceGetter } from 'utils/resourceParser';
import BarChartViz from 'components/viz/BarChart';
import BubbleChart from 'components/viz/BubbleChart';
import { kpiSelector } from 'transformers/kpiTransformer';
import DataAlter from 'components/datasets/DataAlter';
import { cloneDeep } from 'lodash';

Modal.setAppElement('#__next');

type Props = {
  data: any;
  facets: any;
  csv: any;
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

const Analysis: React.FC<Props> = ({ data, csv }) => {
  const [indicatorsList, setIndicatorsList] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [indicators, SetIndicators] = useState({});
  const [filteredData, SetFilteredData] = useState([]);

  function selectGraph(val) {
    // const barList = [
    //   'proportion-of-procurement-method-types',
    //   'average-tendering-period',
    //   'proportion-of-bids',
    //   'proportion-of-saving',
    // ];
    // const bubbleList = ['awardee-details'];
    if (val == 'proportion-of-procurement-method-types') {
      return (
        <BarChartViz
          yAxisLabel="Percent"
          xAxisLabel="Category"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack="True"
        />
      );
    } else if (val == 'average-tendering-period') {
      return (
        <BarChartViz
          yAxisLabel="Days"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack="False"
        />
      );
    } else if (val == 'proportion-of-bids') {
      return (
        <BarChartViz
          yAxisLabel="Tender Count"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack="False"
        />
      );
    } else if (val == 'proportion-of-saving') {
      return (
        <BarChartViz
          yAxisLabel="Percent"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack="False"
        />
      );
    } else if (val == 'awardee-info') {
      return (
        <BubbleChart
          bubbleData1={filteredData}
          color={['#4965B2', '#ED8686']}
          xAxisLabel="Num of Contracts"
          yAxisLabel="Avg. Comp"
        />
      );
    }
  }

  const vizToggle = [
    {
      name: 'Bar',
      id: '#barGraph',
      icon: (
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
      ),
    },
  ];

  const vizItems = [
    {
      id: 'barGraph',
      graph: selectGraph(data.result.name),
    },
  ];

  function handleButtonClick() {
    setModalIsOpen(!modalIsOpen);
  }

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz figure');
    tabbedInterface(tablist, panels);
    console.log(csv);

    const indicatorList = [];
    const vizFilters = {};

    // populating required indicators
    const keys = Object.keys(csv.analytics[0]);
    for (let i = 0; i < 4; i++) {
      const val = keys[i];

      indicatorList.push({ id: val, list: [] });
      vizFilters[val] = [];
    }

    // filling indicators
    for (const element of csv.analytics) {
      indicatorList.forEach((indicator) => {
        element[indicator.id] &&
          indicator.list.push({
            name: element[indicator.id],
            display_name: element[indicator.id],
          });
      });
    }

    // getting unique value and formatting into object similar to 'search_facets' from CKAN
    indicatorList.forEach((indicator) => {
      vizFilters[indicator.id] = {
        items: indicator.list
          .filter(
            (elm: { name: any }, index: any, array: any[]) =>
              array.findIndex((t) => t.name === elm.name) === index
          )
          .slice(0, 5),
        title: indicator.id,
      };
    });
    console.log('vizFilters', vizFilters);

    // setting indicators state
    setIndicatorsList(vizFilters);
  }, []);

  useEffect(() => {
    SetFilteredData(kpiSelector(csv.analytics, indicators, data.result.name));
  }, [indicators]);

  function handleNewVizData(val: any) {
    SetIndicators(cloneDeep(val));
  }

  const dataPackage = ckanToDataPackage(data.result);

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
            <button className="btn-primary" onClick={handleButtonClick}>
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
              closeTimeoutMS={200}
              preventScroll={true}
              htmlOpenClassName="ReactModal__Html--open"
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
              <section className="dialog__body">
                <div>
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
                </div>
                <div className="dialog__format">
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

                    <label htmlFor="downloadFormat2">
                      <input
                        type="radio"
                        id="downloadFormat2"
                        name="dialog-download"
                        value="xls"
                      />
                      XLS File
                    </label>

                    <label htmlFor="downloadFormat3">
                      <input
                        type="radio"
                        id="downloadFormat3"
                        name="dialog-download"
                        value="pdf"
                      />
                      PDF File
                    </label>

                    <label htmlFor="downloadFormat4">
                      <input
                        type="radio"
                        id="downloadFormat4"
                        name="dialog-download"
                        value="zip"
                      />
                      ZIP File
                    </label>
                  </div>
                </div>
              </section>
              <button
                className="btn-primary dialog__submit"
                id="modalSubmit"
                onClick={handleButtonClick}
              >
                Download
              </button>
            </Modal>
          </section>

          <DataAlter
            data={indicatorsList}
            newData={handleNewVizData}
            sortShow={false}
            newIndicator={handleNewVizData}
            indicators={indicators}
          />

          <section className="analysis__content">
            <Indicator data={indicatorsList} newIndicator={handleNewVizData} />
            <div className="viz">
              <div className="viz__header">
                {/* viz selector toggle */}
                <ul className="viz__tabs">
                  {vizToggle.map((item, index) => (
                    <li key={`toggleItem-${index}`}>
                      <a href={item.id}>
                        {item.icon}
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* viz graphs */}
              {vizItems.map((item, index) => (
                <figure
                  key={`vizIyem-${index}`}
                  className="viz__bar"
                  id={item.id}
                >
                  {filteredData.length > 0 && item.graph}
                </figure>
              ))}
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
  const data = await fetchAPI(context.query.analysis);

  const csv = await resourceGetter(data.result.resources, 'CSV');

  return {
    props: {
      data,
      csv,
    },
  };
};

export default Analysis;
