import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { cloneDeep } from 'lodash';

import { tabbedInterface, ckanToDataPackage, fetchAPI } from 'utils/index';
import { resourceGetter } from 'utils/resourceParser';

import MegaHeader from 'components/_shared/MegaHeader';
import Indicator from 'components/analytics/Indicator';
import DataAlter from 'components/datasets/DataAlter';
import DownloadViz from 'components/analytics/DownloadViz';

import { kpiSelector } from 'transformers/kpiTransformer';
import BarChartViz from 'components/viz/BarChart';
import BubbleChart from 'components/viz/BubbleChart';
import Table from 'components/viz/Table';

type Props = {
  data: any;
  facets: any;
  csv: any;
};

const Analysis: React.FC<Props> = ({ data, csv }) => {
  const [indicatorsList, setIndicatorsList] = useState({});
  const [indicators, SetIndicators] = useState({});
  const [filteredData, SetFilteredData] = useState([]);
  const [currentViz, setCurrentViz] = useState('#barGraph');
  const [isTable, setIsTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  const dataPackage = ckanToDataPackage(data.result);

  const headerData = {
    title: dataPackage.title || dataPackage.name,
    previousPage: 'Data Analysis',
    previousLink: '/kpi',
    description: dataPackage.description || '',
  };

  function selectGraph(val, isStacked) {
    if (val == 'proportion-of-procurement-method-types') {
      return (
        <BarChartViz
          yAxisLabel="Percent"
          xAxisLabel="Category"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack={isStacked}
          Title={headerData.title}
          subTitle={headerData.description}
          left="8%"
        />
      );
    } else if (val == 'average-tendering-period') {
      return (
        <BarChartViz
          yAxisLabel="No of days"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack={isStacked}
          Title={headerData.title}
          subTitle={headerData.description}
          left="8%"
        />
      );
    } else if (val == 'proportion-of-bids') {
      return (
        <BarChartViz
          yAxisLabel="Tender Count"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack={isStacked}
          Title={headerData.title}
          subTitle={headerData.description}
          left="8%"
        />
      );
    } else if (val == 'proportion-of-saving') {
      return (
        <BarChartViz
          yAxisLabel="Percent"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack={isStacked}
          Title={headerData.title}
          subTitle={headerData.description}
          left="8%"
        />
      );
    } else if (val == 'proportion-of-value-awarded-in-single-bid-tenders') {
      return (
        <BarChartViz
          yAxisLabel="Percent"
          xAxisLabel="Fiscal Year"
          theme={['#69BC99', '#ED8686']}
          dataset={filteredData}
          stack={isStacked}
          Title={headerData.title}
          subTitle={headerData.description}
          left="8%"
        />
      );
    } else if (val == 'distribution-of-bids-as-per-value') {
      return (
        <BarChartViz
          yAxisLabel="Award Value"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack={isStacked}
          Title={headerData.title}
          subTitle={headerData.description}
          left="15%"
        />
      );
    } else if (val == 'percentage-of-tenders-completed') {
      return (
        <BarChartViz
          yAxisLabel="Percent"
          xAxisLabel="Fiscal Year"
          theme={['#4965B2', '#ED8686', '#69BC99']}
          dataset={filteredData}
          stack={isStacked}
          Title={headerData.title}
          subTitle={headerData.description}
          left="8%"
        />
      );
    } else if (val == 'awardee-info') {
      return (
        <BubbleChart
          bubbleData1={filteredData}
          color={['#4965B2', '#ED8686']}
          xAxisLabel="Num of Contracts"
          yAxisLabel="Avg. Competition"
          Title={headerData.title}
          subTitle={headerData.description}
        />
      );
    }
  }

  function changeViz(e) {
    setCurrentViz(e.target.getAttribute('href'));
    if (e.target.getAttribute('href') == '#tableView') setIsTable(true);
    else setIsTable(false);
  }

  const vizToggle =
    data.result.name == 'awardee-info'
      ? [
          {
            name: 'Bubble Chart',
            id: '#bubbleGraph',
            icon: (
              <svg
                className="svg-icon"
                width="15"
                height="16"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M307.2 614.4m-136.533333 0a136.533333 136.533333 0 1 0 273.066666 0 136.533333 136.533333 0 1 0-273.066666 0Z" />
                <path d="M631.466667 768m-85.333334 0a85.333333 85.333333 0 1 0 170.666667 0 85.333333 85.333333 0 1 0-170.666667 0Z" />
                <path d="M648.533333 375.466667m-204.8 0a204.8 204.8 0 1 0 409.6 0 204.8 204.8 0 1 0-409.6 0Z" />
              </svg>
            ),
          },
          {
            name: 'Table View',
            id: '#tableView',
            icon: (
              <svg
                className="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
              >
                <path d="M0 1.50588C0 .978774 0 .71522.102582.513891.192816.336798.336798.192816.513891.102582.71522 0 .978774 0 1.50588 0H3.2c.52711 0 .79066 0 .99199.102582.17709.090234.32108.234216.41131.411309.10258.201329.10258.464883.10258.991989V3.2c0 .52711 0 .79066-.10258.99199-.09023.17709-.23422.32108-.41131.41131-.20133.10258-.46488.10258-.99199.10258H1.50588c-.527106 0-.79066 0-.991989-.10258-.177093-.09023-.321075-.23422-.411309-.41131C0 3.99066 0 3.72711 0 3.2V1.50588Zm0 5.64706c0-.52711 0-.79066.102582-.99199.090234-.17709.234216-.32108.411309-.41131.201329-.10258.464883-.10258.991989-.10258H3.2c.52711 0 .79066 0 .99199.10258.17709.09023.32108.23422.41131.41131.10258.20133.10258.46488.10258.99199v1.69412c0 .52711 0 .79066-.10258.99199-.09023.17705-.23422.32105-.41131.41135-.20133.1025-.46488.1025-.99199.1025H1.50588c-.527106 0-.79066 0-.991989-.1025-.177093-.0903-.321075-.2343-.411309-.41135C0 9.63772 0 9.37417 0 8.84706V7.15294ZM.102582 11.808C0 12.0093 0 12.2729 0 12.8v1.6941c0 .5271 0 .7907.102582.992.090234.1771.234216.3211.411309.4113C.71522 16 .978774 16 1.50588 16H3.2c.52711 0 .79066 0 .99199-.1026.17709-.0902.32108-.2342.41131-.4113.10258-.2013.10258-.4649.10258-.992V12.8c0-.5271 0-.7907-.10258-.992-.09023-.1771-.23422-.3211-.41131-.4113-.20133-.1026-.46488-.1026-.99199-.1026H1.50588c-.527106 0-.79066 0-.991989.1026-.177093.0902-.321075.2342-.411309.4113ZM5.64706 1.50588c0-.527106 0-.79066.10258-.991989.09023-.177093.23422-.321075.41131-.411309C6.36228 0 6.62583 0 7.15294 0h1.69412c.52711 0 .79066 0 .99199.102582.17705.090234.32105.234216.41135.411309.1025.201329.1025.464883.1025.991989V3.2c0 .52711 0 .79066-.1025.99199-.0903.17709-.2343.32108-.41135.41131-.20133.10258-.46488.10258-.99199.10258H7.15294c-.52711 0-.79066 0-.99199-.10258-.17709-.09023-.32108-.23422-.41131-.41131-.10258-.20133-.10258-.46488-.10258-.99199V1.50588Zm.10258 4.65507c-.10258.20133-.10258.46488-.10258.99199v1.69412c0 .52711 0 .79066.10258.99199.09023.17705.23422.32105.41131.41135.20133.1025.46488.1025.99199.1025h1.69412c.52711 0 .79066 0 .99199-.1025.17705-.0903.32105-.2343.41135-.41135.1025-.20133.1025-.46488.1025-.99199V7.15294c0-.52711 0-.79066-.1025-.99199-.0903-.17709-.2343-.32108-.41135-.41131-.20133-.10258-.46488-.10258-.99199-.10258H7.15294c-.52711 0-.79066 0-.99199.10258-.17709.09023-.32108.23422-.41131.41131ZM5.64706 12.8c0-.5271 0-.7907.10258-.992.09023-.1771.23422-.3211.41131-.4113.20133-.1026.46488-.1026.99199-.1026h1.69412c.52711 0 .79066 0 .99199.1026.17705.0902.32105.2342.41135.4113.1025.2013.1025.4649.1025.992v1.6941c0 .5271 0 .7907-.1025.992-.0903.1771-.2343.3211-.41135.4113C9.63772 16 9.37417 16 8.84706 16H7.15294c-.52711 0-.79066 0-.99199-.1026-.17709-.0902-.32108-.2342-.41131-.4113-.10258-.2013-.10258-.4649-.10258-.992V12.8ZM11.3967.513891c-.1026.201329-.1026.464883-.1026.991989V3.2c0 .52711 0 .79066.1026.99199.0902.17709.2342.32108.4113.41131.2013.10258.4649.10258.992.10258h1.6941c.5271 0 .7907 0 .992-.10258.1771-.09023.3211-.23422.4113-.41131C16 3.99066 16 3.72711 16 3.2V1.50588c0-.527106 0-.79066-.1026-.991989-.0902-.177093-.2342-.321075-.4113-.411309C15.2848 0 15.0212 0 14.4941 0H12.8c-.5271 0-.7907 0-.992.102582-.1771.090234-.3211.234216-.4113.411309Zm-.1026 6.639049c0-.52711 0-.79066.1026-.99199.0902-.17709.2342-.32108.4113-.41131.2013-.10258.4649-.10258.992-.10258h1.6941c.5271 0 .7907 0 .992.10258.1771.09023.3211.23422.4113.41131.1026.20133.1026.46488.1026.99199v1.69412c0 .52711 0 .79066-.1026.99199-.0902.17705-.2342.32105-.4113.41135-.2013.1025-.4649.1025-.992.1025H12.8c-.5271 0-.7907 0-.992-.1025-.1771-.0903-.3211-.2343-.4113-.41135-.1026-.20133-.1026-.46488-.1026-.99199V7.15294Zm.1026 4.65506c-.1026.2013-.1026.4649-.1026.992v1.6941c0 .5271 0 .7907.1026.992.0902.1771.2342.3211.4113.4113.2013.1026.4649.1026.992.1026h1.6941c.5271 0 .7907 0 .992-.1026.1771-.0902.3211-.2342.4113-.4113.1026-.2013.1026-.4649.1026-.992V12.8c0-.5271 0-.7907-.1026-.992-.0902-.1771-.2342-.3211-.4113-.4113-.2013-.1026-.4649-.1026-.992-.1026H12.8c-.5271 0-.7907 0-.992.1026-.1771.0902-.3211.2342-.4113.4113Z" />
              </svg>
            ),
          },
        ]
      : [
          {
            name: 'Stacked Bar',
            id: '#stackedbarGraph',
            icon: (
              <svg
                className="svg-icon"
                width="15"
                height="16"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M547.84 353.28h235.52v394.24h-235.52zM256 552.96h235.52v199.68H256z" />
                <path d="M547.84 128h235.52v619.52h-235.52zM256 419.84h235.52v327.68H256z" />
                <path d="M547.84 353.28h235.52v394.24h-235.52zM256 552.96h235.52v199.68H256z" />
                <path d="M73.216 828.416h870.4v58.88h-870.4z" fill="#E1F1F9" />
              </svg>
            ),
          },
          {
            name: 'Group Bar',
            id: '#groupbarGraph',
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
          {
            name: 'Table View',
            id: '#tableView',
            icon: (
              <svg
                className="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 15 16"
              >
                <path d="M0 1.50588C0 .978774 0 .71522.102582.513891.192816.336798.336798.192816.513891.102582.71522 0 .978774 0 1.50588 0H3.2c.52711 0 .79066 0 .99199.102582.17709.090234.32108.234216.41131.411309.10258.201329.10258.464883.10258.991989V3.2c0 .52711 0 .79066-.10258.99199-.09023.17709-.23422.32108-.41131.41131-.20133.10258-.46488.10258-.99199.10258H1.50588c-.527106 0-.79066 0-.991989-.10258-.177093-.09023-.321075-.23422-.411309-.41131C0 3.99066 0 3.72711 0 3.2V1.50588Zm0 5.64706c0-.52711 0-.79066.102582-.99199.090234-.17709.234216-.32108.411309-.41131.201329-.10258.464883-.10258.991989-.10258H3.2c.52711 0 .79066 0 .99199.10258.17709.09023.32108.23422.41131.41131.10258.20133.10258.46488.10258.99199v1.69412c0 .52711 0 .79066-.10258.99199-.09023.17705-.23422.32105-.41131.41135-.20133.1025-.46488.1025-.99199.1025H1.50588c-.527106 0-.79066 0-.991989-.1025-.177093-.0903-.321075-.2343-.411309-.41135C0 9.63772 0 9.37417 0 8.84706V7.15294ZM.102582 11.808C0 12.0093 0 12.2729 0 12.8v1.6941c0 .5271 0 .7907.102582.992.090234.1771.234216.3211.411309.4113C.71522 16 .978774 16 1.50588 16H3.2c.52711 0 .79066 0 .99199-.1026.17709-.0902.32108-.2342.41131-.4113.10258-.2013.10258-.4649.10258-.992V12.8c0-.5271 0-.7907-.10258-.992-.09023-.1771-.23422-.3211-.41131-.4113-.20133-.1026-.46488-.1026-.99199-.1026H1.50588c-.527106 0-.79066 0-.991989.1026-.177093.0902-.321075.2342-.411309.4113ZM5.64706 1.50588c0-.527106 0-.79066.10258-.991989.09023-.177093.23422-.321075.41131-.411309C6.36228 0 6.62583 0 7.15294 0h1.69412c.52711 0 .79066 0 .99199.102582.17705.090234.32105.234216.41135.411309.1025.201329.1025.464883.1025.991989V3.2c0 .52711 0 .79066-.1025.99199-.0903.17709-.2343.32108-.41135.41131-.20133.10258-.46488.10258-.99199.10258H7.15294c-.52711 0-.79066 0-.99199-.10258-.17709-.09023-.32108-.23422-.41131-.41131-.10258-.20133-.10258-.46488-.10258-.99199V1.50588Zm.10258 4.65507c-.10258.20133-.10258.46488-.10258.99199v1.69412c0 .52711 0 .79066.10258.99199.09023.17705.23422.32105.41131.41135.20133.1025.46488.1025.99199.1025h1.69412c.52711 0 .79066 0 .99199-.1025.17705-.0903.32105-.2343.41135-.41135.1025-.20133.1025-.46488.1025-.99199V7.15294c0-.52711 0-.79066-.1025-.99199-.0903-.17709-.2343-.32108-.41135-.41131-.20133-.10258-.46488-.10258-.99199-.10258H7.15294c-.52711 0-.79066 0-.99199.10258-.17709.09023-.32108.23422-.41131.41131ZM5.64706 12.8c0-.5271 0-.7907.10258-.992.09023-.1771.23422-.3211.41131-.4113.20133-.1026.46488-.1026.99199-.1026h1.69412c.52711 0 .79066 0 .99199.1026.17705.0902.32105.2342.41135.4113.1025.2013.1025.4649.1025.992v1.6941c0 .5271 0 .7907-.1025.992-.0903.1771-.2343.3211-.41135.4113C9.63772 16 9.37417 16 8.84706 16H7.15294c-.52711 0-.79066 0-.99199-.1026-.17709-.0902-.32108-.2342-.41131-.4113-.10258-.2013-.10258-.4649-.10258-.992V12.8ZM11.3967.513891c-.1026.201329-.1026.464883-.1026.991989V3.2c0 .52711 0 .79066.1026.99199.0902.17709.2342.32108.4113.41131.2013.10258.4649.10258.992.10258h1.6941c.5271 0 .7907 0 .992-.10258.1771-.09023.3211-.23422.4113-.41131C16 3.99066 16 3.72711 16 3.2V1.50588c0-.527106 0-.79066-.1026-.991989-.0902-.177093-.2342-.321075-.4113-.411309C15.2848 0 15.0212 0 14.4941 0H12.8c-.5271 0-.7907 0-.992.102582-.1771.090234-.3211.234216-.4113.411309Zm-.1026 6.639049c0-.52711 0-.79066.1026-.99199.0902-.17709.2342-.32108.4113-.41131.2013-.10258.4649-.10258.992-.10258h1.6941c.5271 0 .7907 0 .992.10258.1771.09023.3211.23422.4113.41131.1026.20133.1026.46488.1026.99199v1.69412c0 .52711 0 .79066-.1026.99199-.0902.17705-.2342.32105-.4113.41135-.2013.1025-.4649.1025-.992.1025H12.8c-.5271 0-.7907 0-.992-.1025-.1771-.0903-.3211-.2343-.4113-.41135-.1026-.20133-.1026-.46488-.1026-.99199V7.15294Zm.1026 4.65506c-.1026.2013-.1026.4649-.1026.992v1.6941c0 .5271 0 .7907.1026.992.0902.1771.2342.3211.4113.4113.2013.1026.4649.1026.992.1026h1.6941c.5271 0 .7907 0 .992-.1026.1771-.0902.3211-.2342.4113-.4113.1026-.2013.1026-.4649.1026-.992V12.8c0-.5271 0-.7907-.1026-.992-.0902-.1771-.2342-.3211-.4113-.4113-.2013-.1026-.4649-.1026-.992-.1026H12.8c-.5271 0-.7907 0-.992.1026-.1771.0902-.3211.2342-.4113.4113Z" />
              </svg>
            ),
          },
        ];

  const vizItems =
    data.result.name == 'awardee-info'
      ? [
          {
            id: 'bubbleGraph',
            graph: selectGraph(data.result.name, 'True'),
          },
          {
            id: 'tableView',
            graph: (
              <Table
                headers={
                  csv.analytics[0]
                    ? Object.keys(tableData[0] ? tableData[0] : {})
                    : ['header1']
                }
                rows={tableData}
                caption="Table"
                sortable
              />
            ),
          },
        ]
      : [
          {
            id: 'stackedbarGraph',
            graph: selectGraph(data.result.name, 'True'),
          },
          {
            id: 'groupbarGraph',
            graph: selectGraph(data.result.name, 'False'),
          },
          {
            id: 'x',
            graph: (
              <Table
                headers={
                  csv.analytics[0]
                    ? Object.keys(tableData[0] ? tableData[0] : {})
                    : ['header1']
                }
                rows={tableData}
                caption="Table"
                sortable
              />
            ),
          },
        ];

  useEffect(() => {
    // ceating tabbed interface for viz selector
    const tablist = document.querySelector('.viz__tabs');
    const panels = document.querySelectorAll('.viz figure');
    tabbedInterface(tablist, panels);

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
        items: indicator.list.filter(
          (elm: { name: any }, index: any, array: any[]) =>
            array.findIndex((t) => t.name === elm.name) === index
        ),
        title: indicator.id,
      };
    });
    // setting indicators state
    setIndicatorsList(vizFilters);
  }, []);

  useEffect(() => {
    SetFilteredData(kpiSelector(csv.analytics, indicators, data.result.name));

    // Basic Filter for Table
    let mainData = csv.analytics;
    if (Object.keys(indicators).length > 0) {
      Object.keys(indicators).forEach((key) => {
        if (indicators[key].length > 0) {
          mainData = mainData.filter((item) =>
            indicators[key].includes(item[key])
          );
        }
      });
    }
    setTableData(mainData);
  }, [indicators]);

  function handleNewVizData(val: any) {
    SetIndicators(cloneDeep(val));
  }

  return (
    <>
      <Head>
        <title>{`OCI | ${dataPackage.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" analysis">
        <MegaHeader data={headerData} />
        <div className="page-wrap container">
          <section className="analysis__heading">
            <h3 className="heading-w-line">KPI Analysis</h3>
            <DownloadViz
              type={headerData.title}
              name={headerData.title}
              viz={currentViz}
              isTable={isTable}
            />
          </section>

          <DataAlter
            data={indicatorsList}
            newData={handleNewVizData}
            sortShow={false}
            newIndicator={handleNewVizData}
            indicators={indicators}
          />

          <section className="analysis__content">
            <Indicator
              data={indicatorsList}
              newIndicator={handleNewVizData}
              disableItems={['2023-2024']}
            />
            <div className="viz">
              <div className="viz__header">
                {/* viz selector toggle */}
                <ul className="viz__tabs">
                  {vizToggle.map((item, index) => (
                    <li key={`toggleItem-${index}`}>
                      <a
                        href={item.id}
                        onClick={(e) => changeViz(e)}
                        className="flex items-center"
                      >
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
