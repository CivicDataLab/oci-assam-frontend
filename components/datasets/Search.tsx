import { useState } from 'react';
import { useRouter } from 'next/router';

const Search: React.FC<{ text?: string; newSearch: any }> = ({
  text,
  newSearch,
}) => {
  const router = useRouter();
  const [q, setQ] = useState(router.query.q);

  const handleChange = (event) => {
    setQ(event.target.value);
  };

  function handleClear() {
    const input = document.querySelector('.search__input') as HTMLInputElement;
    input.value = '';
    input.focus();
    setQ('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    newSearch({
      query: 'q',
      value: q,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="search__form">
        <input
          name="q"
          value={q}
          onChange={handleChange}
          placeholder={text ? text : 'Try COVID, Hospital, Construction'}
          aria-label="Search"
          className="search__input"
        />
        <button
          className="search__clear"
          type="button"
          title="Clear search field"
          onClick={handleClear}
        >
          <span className="sr-only">Clear search field</span>
          &#x2715;
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="search__submit btn-primary"
        type="submit"
        title="Submit search"
      >
        Submit
        <span className="sr-only">search</span>
      </button>
    </form>
  );
};

export default Search;
