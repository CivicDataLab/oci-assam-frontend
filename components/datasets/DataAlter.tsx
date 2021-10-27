import React from 'react';
import { useRouter } from 'next/router';

const DataAlter = () => {
  const router = useRouter();
  const q = router.query.q;

  function closeModal() {
    const backdrop = document.querySelector(
      '.data-alter__backdrop'
    ) as HTMLInputElement;
    const sort = document.querySelector(
      '.data-alter__sort'
    ) as HTMLInputElement;

    sort.classList.remove('data-alter__sort--active');
    backdrop.classList.remove('data-alter__backdrop--active');
    document.querySelector('body').classList.remove('scroll-stop');
  }

  React.useEffect(() => {
    // close the modal on backdrop click
    const backdrop = document.querySelector(
      '.data-alter__backdrop'
    ) as HTMLInputElement;
    const sort = document.querySelector(
      '.data-alter__sort'
    ) as HTMLInputElement;

    backdrop.addEventListener('click', () => {
      closeModal();
    });

    // set current sort as checked
    const sortVal = router.query.sort
      ? router.query.sort
      : 'metadata_modified:desc';
    const currentSort = document.getElementById(
      sortVal as string
    ) as HTMLInputElement;
    currentSort.checked = true;
  }, []);

  function handleSortButton() {
    const backdrop = document.querySelector(
      '.data-alter__backdrop'
    ) as HTMLInputElement;
    const sort = document.querySelector(
      '.data-alter__sort'
    ) as HTMLInputElement;

    sort.classList.add('data-alter__sort--active');
    backdrop.classList.add('data-alter__backdrop--active');
    document.querySelector('body').classList.add('scroll-stop');
  }

  function handleSortChange(e: any) {
    const val = e.target.value;
    closeModal();

    router.push({
      pathname: '/datasets',
      query: { q, sort: val },
    });
  }
  return (
    <>
      <div className="data-alter">
        <span className="data-alter__text">Alter Datasets</span>
        <div className="data-alter__buttons">
          <button type="button" onClick={handleSortButton}>
            <div className="data-alter__svg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.24969 5.61006C6.56969 8.59006 9.99969 13.0001 9.99969 13.0001V18.0001C9.99969 19.1001 10.8997 20.0001 11.9997 20.0001C13.0997 20.0001 13.9997 19.1001 13.9997 18.0001V13.0001C13.9997 13.0001 17.4297 8.59006 19.7497 5.61006C20.2597 4.95006 19.7897 4.00006 18.9497 4.00006H5.03969C4.20969 4.00006 3.73969 4.95006 4.24969 5.61006Z"
                  fill="#4965B2"
                />
                <circle
                  cx="19"
                  cy="7.00006"
                  r="4"
                  fill="#4965B2"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
            Add Filters
          </button>
          <button type="button" onClick={handleSortButton}>
            <div className="data-alter__svg">
              <svg
                width="19"
                height="12"
                viewBox="0 0 19 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 12.0001H5.5C6.05 12.0001 6.5 11.5501 6.5 11.0001C6.5 10.4501 6.05 10.0001 5.5 10.0001H1.5C0.95 10.0001 0.5 10.4501 0.5 11.0001C0.5 11.5501 0.95 12.0001 1.5 12.0001ZM0.5 1.00006C0.5 1.55006 0.95 2.00006 1.5 2.00006H17.5C18.05 2.00006 18.5 1.55006 18.5 1.00006C18.5 0.450061 18.05 6.10352e-05 17.5 6.10352e-05H1.5C0.95 6.10352e-05 0.5 0.450061 0.5 1.00006ZM1.5 7.00006H11.5C12.05 7.00006 12.5 6.55006 12.5 6.00006C12.5 5.45006 12.05 5.00006 11.5 5.00006H1.5C0.95 5.00006 0.5 5.45006 0.5 6.00006C0.5 6.55006 0.95 7.00006 1.5 7.00006Z"
                  fill="#4965B2"
                />
              </svg>
            </div>
            Sort Results
          </button>
        </div>
        <button className="data-alter__mobile">
          <div className="data-alter__svg">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.6669 7.48003C8.76024 11.4534 13.3336 17.3334 13.3336 17.3334V24C13.3336 25.4667 14.5336 26.6667 16.0002 26.6667C17.4669 26.6667 18.6669 25.4667 18.6669 24V17.3334C18.6669 17.3334 23.2402 11.4534 26.3336 7.48003C27.0136 6.60003 26.3869 5.33337 25.2669 5.33337H6.72024C5.61357 5.33337 4.9869 6.60003 5.6669 7.48003Z"
                fill="#4965B2"
              />
              <path
                d="M25.334 14.3334C28.0954 14.3334 30.334 12.0948 30.334 9.33337C30.334 6.57194 28.0954 4.33337 25.334 4.33337C22.5726 4.33337 20.334 6.57194 20.334 9.33337C20.334 12.0948 22.5726 14.3334 25.334 14.3334Z"
                fill="#4965B2"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="sr-only">Alter Datasets</span>
        </button>
      </div>

      <div className="data-alter__backdrop" />

      <div className="data-alter__sort">
        <div className="sort__header">
          <h3>Sort Datasets</h3>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeModal}
          >
            &#x78;
          </button>
        </div>
        <fieldset
          className="sort__options"
          onChange={(e) => handleSortChange(e)}
        >
          <legend className="sr-only">Sort Datasets</legend>
          <label htmlFor="metadata_modified:desc">
            <input
              type="radio"
              value="metadata_modified:desc"
              name="sort-group"
              id="metadata_modified:desc"
            />
            Last Modified
          </label>
          <label htmlFor="score:desc">
            <input
              type="radio"
              value="score:desc"
              name="sort-group"
              id="score:desc"
            />
            Relevance
          </label>
          <label htmlFor="title_string:asc">
            <input
              type="radio"
              value="title_string:asc"
              name="sort-group"
              id="title_string:asc"
            />
            Name Ascending
          </label>
          <label htmlFor="title_string:desc">
            <input
              type="radio"
              value="title_string:desc"
              name="sort-group"
              id="title_string:desc"
            />
            Name Descending
          </label>

          <label htmlFor="views_recent:desc">
            <input
              type="radio"
              value="views_recent:desc"
              name="sort-group"
              id="views_recent:desc"
            />
            Popular
          </label>
        </fieldset>
      </div>
    </>
  );
};

export default DataAlter;
