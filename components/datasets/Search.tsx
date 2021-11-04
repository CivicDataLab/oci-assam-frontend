import { useState } from 'react';
import { useRouter } from 'next/router';

const Search: React.FC<{ text?: string }> = ({ text }) => {
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
    const input = document.querySelector('.search__input') as HTMLInputElement;
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
    <form onSubmit={handleSubmit} className="search">
      <input
        type="search"
        name="q"
        value={q}
        onChange={handleChange}
        placeholder={text ? text : 'Try COVID, Hospital, Construction'}
        aria-label="Search"
        className="search__input"
      />
      <div className="search__buttons">
        <button
          className="search__clear"
          type="button"
          title="Clear search field"
          onClick={handleClear}
        >
          <span className="sr-only">Clear search field</span>
          &#x2715;
        </button>
        <button
          onClick={handleSubmit}
          className="search__submit button-primary"
          type="submit"
          title="Submit search"
        >
          Submit
          <span className="sr-only">search</span>
        </button>
      </div>
    </form>
  );
};

export default Search;
