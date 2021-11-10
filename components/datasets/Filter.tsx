import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
const obj = {};

const Filter = ({ data }) => {
  const router = useRouter();
  const { q, sort, size, fq } = router.query;
  // const [filter, setFilter] = useState([router.query.fq]);

  function headingCollapsable() {
    const headings = document.querySelectorAll('.filters__heading');

    Array.prototype.forEach.call(headings, (h) => {
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
      obj[val] = [];
    });

    // if filter query available on page load, add class
    if (fq) {
      const splitQuery = (fq as string).split(
        /[\s:]+(?=(?:(?:[^"]*"){2})*[^"]*$)/
      );
      let check = splitQuery[0];
      splitQuery.forEach((query) => {
        if (obj[query]) {
          check = query;
          return;
        }
        let filterID: string;
        if (query.includes(' ')) filterID = query.replaceAll(/"/g, '');
        else filterID = query;

        obj[check].push(query);
        if (document.getElementById(filterID))
          document
            .getElementById(filterID)
            .setAttribute('aria-pressed', 'true');
      });
      console.log(obj);
    }
  }, []);

  function formatFilterName(name: string) {
    if (name == 'res_format') {
      return 'format';
    } else return name;
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

    const index = obj[type].indexOf(value);
    if (index > -1) {
      obj[type].splice(index, 1);
    } else {
      obj[type].push(value.includes(' ') ? `"${value}"` : value);
    }

    const eachType = [];
    Object.keys(obj).forEach((val) => {
      if (obj[val].length > 0) {
        const str = obj[val].join(' ');
        eachType.push(`${val}:${str}`);
      }
    });
    const filter = eachType.join(' ');

    router.push({
      pathname: '/datasets',
      query: { fq: filter, q, sort, size, from: '0' },
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
          <div hidden>
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
