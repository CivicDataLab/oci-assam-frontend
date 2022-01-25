import React, { useEffect } from 'react';
const obj = {};

const Filter = ({ data, newFilters, fq }) => {
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
      obj[val] = [];
    });

    // if filter query available on page load, add class to relevant buttons
    if (fq) {
      const removeEscape = fq.replaceAll(/"/g, '');
      const splitFilters = removeEscape.split(' AND ');

      splitFilters.forEach((query: any) => {
        const id = query.split(':')[0];

        let value = query.split(':')[1];
        value = value.slice(1, value.length - 1);
        const valueArr = value.split(' OR ');

        valueArr.forEach((element) => {
          obj[id].push(element);

          if (document.getElementById(element))
            document
              .getElementById(element)
              .setAttribute('aria-pressed', 'true');
        });
      });
    }
  }, []);

  function formatFilterName(name: string) {
    if (name == 'fiscal_year') {
      return 'fiscal year';
    } else if (name == 'organization' || name == 'buyer_name')
      return 'buyer name';
    else if (name == 'tender_mainprocurementcategory') return 'type';
    else if (name == 'tender/mainProcurementCategory') return 'category';
    else if (name == 'tender/stage') return 'tender stage';
    else if (name == 'tender_status') return 'status';
    else return name;
  }

  function handleFilterChange(e: any) {
    const selectedFilter = e.target as HTMLInputElement;
    const type = selectedFilter.dataset.type;
    const value = selectedFilter.id;

    const pressed = selectedFilter.getAttribute('aria-pressed');
    selectedFilter.setAttribute(
      'aria-pressed',
      pressed == 'false' ? 'true' : 'false'
    );

    console.log(obj);

    const index = obj[type].indexOf(value);
    if (index > -1) {
      obj[type].splice(index, 1);
    } else {
      obj[type].push(value);
    }

    const final = [];
    Object.keys(obj).forEach((val) => {
      if (obj[val].length > 0) {
        let filter = '';

        filter = filter.concat(`${val}:(`);
        const valArray = [];

        obj[val].forEach((item: string) => {
          valArray.push(`"${item}"`);
        });

        const valString = valArray.join(' OR ');
        filter = filter.concat(valString + ')');
        final.push(filter);
      }
    });

    const finalFilter = final.join(' AND ');

    console.log(finalFilter);

    newFilters({
      query: 'fq',
      value: finalFilter,
    });
  }

  return (
    <div className="filters">
      <h3 className="heading3-w-line">Filters</h3>
      {Object.keys(data).map((filter: any, index: number) => (
        <React.Fragment key={`filters-${index}`}>
          <h4 className="filters__heading" key={`filter-${index}`}>
            <button aria-expanded="false">
              {formatFilterName(data[filter].title)}
              <svg aria-hidden="true" focusable="false" viewBox="0 0 144 72">
                <path d="M72 72C72 71.98 0 0 0 0h144L72 72" />
              </svg>
            </button>
          </h4>
          <div className="filters__content" hidden>
            {data[filter].items &&
              data[filter].items.map((item: any) => (
                <button
                  className="filters__button"
                  key={item.name}
                  data-type={data[filter].title}
                  id={item.name}
                  onClick={handleFilterChange}
                  type="button"
                  aria-pressed="false"
                >
                  {`${item.display_name} (${item.count})`}
                </button>
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Filter;
