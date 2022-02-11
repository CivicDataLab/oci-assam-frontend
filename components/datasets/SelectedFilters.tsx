import React, { useEffect, useState } from 'react';
// import { filterStringToObject } from 'utils/index';

const SelectedFilters = ({ data, newFilters, fq }) => {
  const [filterObj, setFilterObj] = useState({});
  const [filterArray, setFilterArray] = useState([]);

  useEffect(() => {
    const filters = [];
    Object.keys(filterObj).forEach((type) => {
      if (filterObj[type].length > 0)
        filterObj[type].forEach((item: any) =>
          filters.push({ value: item, type: type })
        );
    });

    setFilterArray(filters);
  }, [filterObj]);

  // useEffect(() => {
  //   const obj = filterStringToObject(fq, data);
  //   setFilterObj(obj);
  // }, [fq]);

  function removeFilter(e: any) {
    const selectedFilter = e.target as HTMLInputElement;
    const type = selectedFilter.dataset.type;
    const value = selectedFilter.dataset.id;

    if (document.getElementById(value))
      document.getElementById(value).setAttribute('aria-pressed', 'false');

    const index = filterObj[type].indexOf(value);
    if (index > -1) {
      filterObj[type].splice(index, 1);
    }
    newFilters({
      query: 'fq',
      value: filterObj,
    });
  }

  return (
    <ul className="selected-filters">
      {filterArray.length > 0 &&
        filterArray.map((item) => {
          return (
            <li key={`${item.value}-selected`}>
              <button
                data-type={item.type}
                data-id={item.value}
                onClick={removeFilter}
              >
                {item.value.replace(/[^A-Z0-9]/gi, ' ')} &#x2715;
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default SelectedFilters;
