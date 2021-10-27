import { useState } from 'react';
import { useRouter } from 'next/router';

const Sort = () => {
  const router = useRouter();
  const [sort, setSort] = useState(router.query.sort);

  const handleChange = (event) => {
    setSort(event.target.value);
    router.push({
      pathname: '/datasets',
      query: { sort: event.target.value },
    });
  };
  return (
    <div className="sort">
      <label htmlFor="field-order-by" className="sort__label">
        Sort by&nbsp;&nbsp;
      </label>
      <select
        className="sort__select select-comp"
        id="field-order-by"
        name="sort"
        onChange={handleChange}
        onBlur={handleChange}
        value={sort}
      >
        <option value="score:desc">Relevance</option>
        <option value="title_string:asc">Name Ascending</option>
        <option value="title_string:desc">Name Descending</option>
        <option value="metadata_modified:desc">Last Modified</option>
        <option value="views_recent:desc">Popular</option>
      </select>
    </div>
  );
};

export default Sort;
