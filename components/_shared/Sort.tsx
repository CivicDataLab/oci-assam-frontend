import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Sort: React.FC<{ newSort: any }> = ({ newSort }) => {
  const router = useRouter();
  const [sort, setSort] = useState('tender_bid_opening_date:asc');

  useEffect(() => {
    const currentSort = router.query.sort
      ? router.query.sort
      : 'tender_bid_opening_date:asc';

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
        <option value="tender_bid_opening_date:asc">Date Asc</option>
        <option value="tender_bid_opening_date:desc">Date Desc</option>
        <option value="tender_value_amount:asc">Tender Value Asc</option>
        <option value="tender_value_amount:desc">Tender Value Desc</option>
        <option value="buyer_name:asc">Departments</option>
        <option value="score:desc">Relevance</option>
      </select>
    </div>
  );
};

export default Sort;
