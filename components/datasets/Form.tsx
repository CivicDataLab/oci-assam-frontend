import { useState } from 'react';
import { useRouter } from 'next/router';

const Form: React.FC = () => {
  const router = useRouter();
  const [q, setQ] = useState(router.query.q);
  const [sort, setSort] = useState(router.query.sort);

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'q':
        setQ(event.target.value);
        break;
      case 'sort':
        setSort(event.target.value);
        router.push({
          pathname: '/datasets',
          query: { q, sort: event.target.value },
        });
        break;
    }
  };

  function handleClear() {
    const input = document.querySelector('.form__input') as HTMLInputElement;
    input.value = '';
    input.focus();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: '/datasets',
      query: { q, sort },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__search">
        <input
          type="search"
          name="q"
          value={q}
          onChange={handleChange}
          placeholder="Search here"
          aria-label="Search"
          className="form__input"
        />
        <div className="form__buttons">
          <button
            className="form__clear"
            type="button"
            title="Clear search field"
            onClick={handleClear}
          >
            <span className="sr-only">Clear search field</span>
            &#x2715;
          </button>
          <button
            onClick={handleSubmit}
            className="form__submit"
            type="submit"
            title="Submit search"
          >
            <span className="sr-only">Submit search</span>
            &#x279C;
          </button>
        </div>
      </div>
      <div className="form__sort">
        <label htmlFor="field-order-by" className="sr-only">
          Sort by:&nbsp;
        </label>
        <select
          className="form__select select-comp"
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
    </form>
  );
};

export default Form;
