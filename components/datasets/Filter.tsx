// import { useState } from 'react';
import { useRouter } from 'next/router';

const Filter = ({ data }) => {
  const router = useRouter();
  const { q, sort, size, from } = router.query;
  // const [filter, setFilter] = useState(router.query.filter);

  function formatFilterName(name: string) {
    if (name == 'res_format') {
      return 'format';
    } else return name;
  }

  function handleFilterChange(e: any) {
    // console.log(`${e.target.dataset.type}:${e.target.id}`);
    const fq = `${e.target.dataset.type}:${e.target.id}`;
    // const type = e.target.dataset.type;
    // const value = e.target.id;
    // setFilter(value);
    router.push({
      pathname: '/datasets',
      query: { fq, q, sort, size, from: '0' },
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
