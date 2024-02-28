import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { tabbedInterface } from 'utils/index';
import { formatFilterName } from 'pages/datasets';

Modal.setAppElement('#__next');

const sort = [
  {
    id: 'tender_bid_opening_date:asc',
    name: 'Date',
  },
  {
    id: 'tender_value_amount:asc',
    name: 'Tender Value',
  },
  {
    id: 'organization.title:desc',
    name: 'Departments',
  },
  {
    id: 'score:desc',
    name: 'Relevance',
  },
];

const objMobile = {};
const DataAlter: React.FC<{
  data?: any;
  newData?: any;
  fq?: any;
  sortShow?: boolean;
  newIndicator?: any;
  indicators?: any;
}> = ({ data, newData, fq, sortShow, newIndicator, indicators }) => {
  const displaySort = sortShow == false ? false : true;

  const router = useRouter();
  const [sortIsOpen, setSortIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState(
    router.query.sort ? router.query.sort : 'tender_bid_opening_date:asc'
  );
  const [selectedSort, setSelectedSort] = useState(
    router.query.sort ? router.query.sort : 'tender_bid_opening_date:asc'
  );

  function checkInput(selected) {
    const filterElement = document.getElementById(
      `${selected}-m`
    ) as HTMLInputElement;
    if (filterElement) filterElement.checked = true;
  }

  useEffect(() => {
    setTimeout(() => {
      // create tabbed interface
      const tablist = document.getElementById('filterSelector');
      const panels = document.querySelectorAll(
        '.dialog__body [role="tabpanel"]'
      );
      if (tablist) tabbedInterface(tablist, panels);

      // Create filter object
      if (data)
        Object.keys(data).forEach((val) => {
          objMobile[val] = [];
        });

      // check previous selected filters
      if (fq) {
        const removeEscape = fq.replaceAll(/"/g, '');
        const splitFilters = removeEscape.split(' AND ');

        splitFilters.forEach((query: any) => {
          const id = query.split(':')[0];
          const value = query.split(':')[1];
          objMobile[id].push(value);
          checkInput(value);
        });
      }

      // check previous selected indicators
      if (indicators && Object.keys(indicators).length > 0) {
        Object.keys(indicators).forEach((elm) => {
          const id = elm;
          const value: any[] = indicators[elm];

          value.forEach((selected) => {
            objMobile[id].push(selected);
            checkInput(selected);
          });
        });
      }
    }, 50);
  }, [filterIsOpen]);

  if (sortShow) {
    useEffect(() => {
      setTimeout(() => {
        if (document.querySelector('#modalSort')) {
          document
            .querySelector('#modalSort')
            .addEventListener('change', (e: any) => {
              setSelectedSort(e.target.value);
            });
        }

        const selectedSort = document.getElementById(
          currentSort as string
        ) as HTMLInputElement;
        if (selectedSort) selectedSort.checked = true;
      }, 50);
      return () => {
        if (document.querySelector('#modalSort'))
          document
            .querySelector('#modalSort')
            .addEventListener('change', (e: any) => {
              setSelectedSort(e.target.value);
            });
      };
    }, [sortIsOpen]);
  }

  if (sortShow) {
    useEffect(() => {
      newData({
        query: 'sort',
        value: currentSort,
      });
    }, [currentSort]);
  }

  function handleFilterClick() {
    setFilterIsOpen(!filterIsOpen);
  }

  function handleFilterClear() {
    // reset object
    if (data)
      Object.keys(data).forEach((val) => {
        objMobile[val] = [];
      });

    const selectedFilters = document.querySelectorAll(
      '.data-alter__filter input:checked'
    );

    selectedFilters.forEach((filter: HTMLInputElement) => {
      const filterElement = document.getElementById(
        `${filter.id}`
      ) as HTMLInputElement;
      if (filterElement) filterElement.checked = false;
    });
  }

  function applyFilterChange() {
    // select checked inputs
    const selectedFilters = document.querySelectorAll(
      '.data-alter__filter input:checked'
    );

    // reset object
    if (data)
      Object.keys(data).forEach((val) => {
        objMobile[val] = [];
      });

    // add checked filters to object
    selectedFilters.forEach((filter: HTMLInputElement) => {
      const type = filter.dataset.type;
      const value = filter.value;
      const index = objMobile[type].indexOf(value);
      if (index == -1) {
        objMobile[type].push(value);
      }
    });
    // if it's indicator change, then return the object
    if (newIndicator) {
      newIndicator(objMobile);
    }
    // else create string and query URL
    else {
      // create the filter string for CKAN API
      const final = [];
      let filter: string;
      Object.keys(objMobile).forEach((val) => {
        if (objMobile[val].length > 0) {
          objMobile[val].forEach((item: string) =>
            final.push(`${val}:"${item}"`)
          );

          filter = final.join(' AND ');
        }
      });

      newData({
        query: 'fq',
        value: filter,
      });
    }

    handleFilterClick();
  }

  function handleSortClick() {
    setSortIsOpen(!sortIsOpen);
  }

  function applySortChange() {
    setCurrentSort(selectedSort);
    handleSortClick();
  }

  function cancelSortChange() {
    setSelectedSort(currentSort);
    handleSortClick();
  }
  return (
    <>
      <div className="data-alter">
        <span className="data-alter__text">Alter Datasets</span>
        <div className="data-alter__buttons">
          <button type="button" onClick={handleFilterClick}>
            <div className="data-alter__svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.24969 5.61006C6.56969 8.59006 9.99969 13.0001 9.99969 13.0001V18.0001C9.99969 19.1001 10.8997 20.0001 11.9997 20.0001C13.0997 20.0001 13.9997 19.1001 13.9997 18.0001V13.0001C13.9997 13.0001 17.4297 8.59006 19.7497 5.61006C20.2597 4.95006 19.7897 4.00006 18.9497 4.00006H5.03969C4.20969 4.00006 3.73969 4.95006 4.24969 5.61006Z"
                  fill="#4965B2"
                />
                <circle
                  cx="19"
                  cy="7.00006"
                  r="4"
                  fill="#4965B2"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
            Add Filters
          </button>
          {displaySort && (
            <button type="button" onClick={handleSortClick}>
              <div className="data-alter__svg">
                <svg
                  width="19"
                  height="12"
                  viewBox="0 0 19 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 12.0001H5.5C6.05 12.0001 6.5 11.5501 6.5 11.0001C6.5 10.4501 6.05 10.0001 5.5 10.0001H1.5C0.95 10.0001 0.5 10.4501 0.5 11.0001C0.5 11.5501 0.95 12.0001 1.5 12.0001ZM0.5 1.00006C0.5 1.55006 0.95 2.00006 1.5 2.00006H17.5C18.05 2.00006 18.5 1.55006 18.5 1.00006C18.5 0.450061 18.05 6.10352e-05 17.5 6.10352e-05H1.5C0.95 6.10352e-05 0.5 0.450061 0.5 1.00006ZM1.5 7.00006H11.5C12.05 7.00006 12.5 6.55006 12.5 6.00006C12.5 5.45006 12.05 5.00006 11.5 5.00006H1.5C0.95 5.00006 0.5 5.45006 0.5 6.00006C0.5 6.55006 0.95 7.00006 1.5 7.00006Z"
                    fill="#4965B2"
                  />
                </svg>
              </div>
              Sort Results
            </button>
          )}
        </div>
      </div>

      {/* Sort Modal */}
      {displaySort && (
        <Modal
          isOpen={sortIsOpen}
          onRequestClose={handleSortClick}
          className="dialog"
          overlayClassName="dialog__backdrop"
          closeTimeoutMS={200}
          aria={{
            labelledby: 'dialog-head',
          }}
          preventScroll={true}
          htmlOpenClassName="ReactModal__Html--open"
        >
          <div className="dialog__header">
            <h1 id="dialog-head">Sort Datasets</h1>
          </div>
          <fieldset className="dialog__body" id="modalSort">
            <legend className="sr-only">Sort Results</legend>
            {sort.map((elm, index) => {
              return (
                <label key={`sort-${index}`} htmlFor={elm.id}>
                  <input
                    type="radio"
                    value={elm.id}
                    name="sort-group"
                    id={elm.id}
                  />
                  {elm.name}
                </label>
              );
            })}
          </fieldset>
          <div className="data-alter__footer">
            <button
              type="button"
              onClick={cancelSortChange}
              className="btn-secondary-invert"
            >
              Close
            </button>
            <button
              type="button"
              onClick={applySortChange}
              className="btn-secondary"
            >
              Apply
            </button>
          </div>
        </Modal>
      )}

      {/* Filter Modal */}
      <Modal
        isOpen={filterIsOpen}
        onRequestClose={handleFilterClick}
        className="dialog"
        overlayClassName="dialog__backdrop"
        closeTimeoutMS={200}
        aria={{
          labelledby: 'dialog-head',
        }}
        preventScroll={true}
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="dialog__header dialog__header--filter">
          <h1 id="dialog-head">Add Filters</h1>
          <button
            type="button"
            className="dialog__clear"
            aria-label="Close navigation"
            onClick={handleFilterClear}
          >
            clear all
          </button>
        </div>
        <fieldset className="dialog__body">
          <legend className="sr-only">Add Filters</legend>
          {data && (
            <div className="data-alter__filter">
              <ul id="filterSelector" role="tablist">
                {Object.keys(data).map((filter: any, index: number) => (
                  <li role="presentation" key={`filterTitle-${index}`}>
                    <a
                      role="tab"
                      tabIndex={-1}
                      href={`#${data[filter].title}`}
                      data-id={data[filter].title}
                      id={`filterTab${index}`}
                    >
                      {formatFilterName(data[filter].title)}
                    </a>
                  </li>
                ))}
              </ul>
              {Object.keys(data).map((filter: any, index: number) => (
                <div
                  key={`filter-${index}`}
                  id={data[filter].title}
                  role="tabpanel"
                  tabIndex={-1}
                  aria-labelledby={`filterTab${index}`}
                >
                  {data[filter].items &&
                    data[filter].items.map((item: any, index: number) => (
                      <label
                        key={`filterItem-${index}`}
                        htmlFor={`${item.name}-m`}
                      >
                        <input
                          type="checkbox"
                          value={item.name}
                          name="sort-group"
                          id={`${item.name}-m`}
                          data-type={data[filter].title}
                        />
                        {item.display_name}
                      </label>
                    ))}
                </div>
              ))}
            </div>
          )}
        </fieldset>
        <div className="data-alter__footer">
          <button
            type="button"
            onClick={handleFilterClick}
            className="btn-secondary-invert"
          >
            Close
          </button>
          <button
            type="button"
            onClick={applyFilterChange}
            className="btn-secondary"
          >
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DataAlter;
