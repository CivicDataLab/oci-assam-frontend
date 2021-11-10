import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Sort: React.FC<{ newSort: any }> = ({ newSort }) => {
  const router = useRouter();
  const [sort, setSort] = useState('');

  useEffect(() => {
    const currentSort = router.query.sort
      ? router.query.sort
      : 'metadata_modified:desc';

    setSort(currentSort as string);
  }, [router.query.sort]);

  const handleChange = (event: any) => {
    setSort(event.target.value);

    newSort({
      query: 'sort',
      value: event.target.value,
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
