import { Cross } from 'components/icons/shared';
import { truncate } from 'lodash';
import React, { useEffect, useState } from 'react';
const indicatorObj = {};
const indicatorSearch = {};

const Indicator = ({ data, newIndicator }) => {
  const [indicatorResult, setIndicatorResult] = useState({});

  function headingCollapsable() {
    const headings = document.querySelectorAll('.filters__heading');

    Array.prototype.forEach.call(headings, (h: any) => {
      const btn = h.querySelector('button');
      const target = h.nextElementSibling;

      btn.onclick = () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        const selectedBtn = document.querySelector(
          '.filters__heading [aria-expanded = "true"]'
        );
        if (selectedBtn && !expanded) {
          selectedBtn.setAttribute('aria-expanded', 'false');
          (
            selectedBtn.parentElement.nextElementSibling as HTMLElement
          ).hidden = true;
        }

        btn.setAttribute('aria-expanded', !expanded);
        target.hidden = expanded;
      };
    });
  }

  useEffect(() => {
    headingCollapsable();

    Object.keys(data).forEach((val) => {
      indicatorObj[val] = [];
      indicatorSearch[val] = data[val].items;
    });

    setIndicatorResult({ ...indicatorSearch });
  }, [data]);

  function handleIndicatorSearch(val: string, id: string) {
    const searchFilter = data[id].items.filter((item: any) =>
      JSON.stringify(item).toLowerCase().includes(val.toLowerCase())
    );
    indicatorSearch[id] = searchFilter;

    setIndicatorResult({ ...indicatorSearch });
  }

  function formatFilterName(name: string) {
    if (name == 'fiscal_year') {
      return 'fiscal year';
    } else if (name == 'buyer_name') return 'buyer name';
    else if (name == 'tender/mainProcurementCategory') return 'category';
    else if (name == 'tender/stage') return 'tender stage';
    else return name;
  }

  function handleIndicatorChange(e: any) {
    const selectedFilter = e.target as HTMLInputElement;
    const type = selectedFilter.dataset.type;
    const value = selectedFilter.id || selectedFilter.dataset.id;

    const indicatorButton = document.getElementById(value);

    const pressed = indicatorButton.getAttribute('aria-pressed');
    indicatorButton.setAttribute(
      'aria-pressed',
      pressed == 'false' ? 'true' : 'false'
    );

    const index = indicatorObj[type].indexOf(value);
    if (index > -1) {
      indicatorObj[type].splice(index, 1);
    } else {
      indicatorObj[type].push(value);
    }
    newIndicator(indicatorObj);
  }

  return (
    <div className="filters">
      <h3 className="heading3-w-line">Filters</h3>
      {Object.keys(data).map((filter: any, index: number) => (
        <React.Fragment key={`filters-${index}`}>
          <h4 className="filters__heading" key={`indicator-${index}`}>
            <button aria-expanded="false">
              {formatFilterName(filter)}
              <svg aria-hidden="true" focusable="false" viewBox="0 0 144 72">
                <path d="M72 72C72 71.98 0 0 0 0h144L72 72" />
              </svg>
            </button>
          </h4>
          <div hidden>
            <input
              type="text"
              className="filters__search"
              placeholder={`search ${formatFilterName(data[filter].title)}`}
              onChange={(e) => handleIndicatorSearch(e.target.value, filter)}
            />
            {indicatorResult[filter] &&
              indicatorResult[filter].map((item: any) => (
                <button
                  className="filters__button"
                  key={item.display_name}
                  data-type={data[filter].title}
                  id={item.display_name}
                  onClick={handleIndicatorChange}
                  type="button"
                  aria-pressed="false"
                >
                  {`${item.display_name}`}
                </button>
              ))}
          </div>
          <ul className="filters__selected">
            {indicatorObj[filter] &&
              indicatorObj[filter].map((item: string) => (
                <li key={item}>
                  <button
                    data-type={filter}
                    data-id={item}
                    onClick={handleIndicatorChange}
                  >
                    {truncate(item.replace(/_/g, ' '), { length: 30 })}{' '}
                    <Cross />
                  </button>
                </li>
              ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Indicator;
