import React, { useEffect } from 'react';
const indicatorObj = {};

const Indicator = ({ data, newIndicator }) => {
  function headingCollapsable() {
    const headings = document.querySelectorAll('.filters__heading');

    Array.prototype.forEach.call(headings, (h: any) => {
      const btn = h.querySelector('button');
      const target = h.nextElementSibling;

      btn.onclick = () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', !expanded);
        target.hidden = expanded;
      };
    });
  }

  useEffect(() => {
    headingCollapsable();

    Object.keys(data).forEach((val) => {
      indicatorObj[val] = [];
    });
  }, [data]);

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
    const value = selectedFilter.id;

    const pressed = selectedFilter.getAttribute('aria-pressed');
    selectedFilter.setAttribute(
      'aria-pressed',
      pressed == 'false' ? 'true' : 'false'
    );

    const index = indicatorObj[type].indexOf(value);
    if (index > -1) {
      indicatorObj[type].splice(index, 1);
    } else {
      indicatorObj[type].push(value);
    }
    // console.log(indicatorObj);

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
            {data[filter] &&
              data[filter].map((item: any) => (
                <button
                  className="filters__button"
                  key={item}
                  data-type={filter}
                  id={item}
                  onClick={handleIndicatorChange}
                  type="button"
                  aria-pressed="false"
                >
                  {`${item}`}
                </button>
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Indicator;
