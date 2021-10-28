const Filter = ({ data }) => {
  function formatFilterName(name: string) {
    if (name == 'res_format') {
      return 'format';
    } else return name;
  }

  return (
    <div className="filters">
      <h3>Filters</h3>
      {Object.keys(data).map((filter: any, index: number) => (
        <details key={`filter-${index}`}>
          <summary>{formatFilterName(data[filter].title)}</summary>
          {data[filter].items &&
            data[filter].items.map((item: any, index: number) => (
              <button key={`filter-item-${index}`}>
                {`${item.display_name} (${item.count})`}
              </button>
            ))}
        </details>
      ))}
    </div>
  );
};

export default Filter;
