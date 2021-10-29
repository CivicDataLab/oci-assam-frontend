import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const obj = {};

const Filter = ({ data }) => {
  const router = useRouter();
  const { q, sort, size, fq } = router.query;
  const [filter, setFilter] = useState([router.query.fq]);

  useEffect(() => {
    Object.keys(data).forEach((val) => {
      obj[val] = [];
    });
    if (fq) {
      console.log(fq);

      (fq as string).split(':').forEach((activeID) => {
        if (activeID.includes(' ')) {
          activeID.split(' ').forEach((buttonID) => {
            if (document.getElementById(buttonID))
              document
                .getElementById(buttonID)
                .classList.add('filters--active');
          });
        }
        if (document.getElementById(activeID))
          document.getElementById(activeID).classList.add('filters--active');
      });
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
    selectedFilter.classList.toggle('filters--active');

    const index = obj[type].indexOf(value);
    if (index > -1) {
      obj[type].splice(index, 1);
    } else {
      obj[type].push(value);
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
      <h3>Filters</h3>
      {Object.keys(data).map((filter: any, index: number) => (
        <details key={`filter-${index}`}>
          <summary>{formatFilterName(data[filter].title)}</summary>
          {data[filter].items &&
            data[filter].items.map((item: any) => (
              <button
                className="filters__button"
                key={item.name}
                data-type={data[filter].title}
                id={item.name}
                onClick={handleFilterChange}
              >
                {`${item.display_name} (${item.count})`}
              </button>
            ))}
        </details>
      ))}
    </div>
  );
};

export default Filter;
