import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { sortItems } from 'components/datasets/data';

const Sort: React.FC<{ newSort: any; defaultSort: string }> = ({
  newSort,
  defaultSort,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState(defaultSort);

  useEffect(() => {
    const currentSort = router.query.sort ? router.query.sort : defaultSort;

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
        {sortItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
