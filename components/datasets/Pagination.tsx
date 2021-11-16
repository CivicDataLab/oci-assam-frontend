import { useRouter } from 'next/router';
import React from 'react';
import Dropdown from 'components/_shared/dropdown';

const Pagination: React.FC<{ total: number; newPage: any }> = ({
  total,
  newPage,
}) => {
  const router = useRouter();
  const [current, setCurrent] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [resultSize, setResultSize] = React.useState(10);
  const [maxPage, SetMaxPage] = React.useState(1);

  React.useEffect(() => {
    const from = router.query.from ? router.query.from : '0';
    const size = router.query.size ? router.query.size : '10';
    SetMaxPage(Math.floor(total / parseInt(size as string)) + 1);

    setResultSize(parseInt(size as string));

    const pageNo = Math.floor(
      parseInt(from as string) / parseInt(size as string) + 1
    );
    (document.getElementById('jumpNumber') as HTMLInputElement).value =
      String(pageNo);

    setPage(pageNo);
  }, [router.query.from, router.query.size]);

  function fetchNewResults(val: any, type: string) {
    newPage({
      query: type,
      value: val,
    });
  }

  function handleRowsChange(e: any) {
    const size = e.target.value;

    fetchNewResults(size, 'size');
  }

  function handleJump(val: string) {
    const jumpVal = parseInt(val as string);
    if (!(jumpVal < 1 || jumpVal > maxPage || jumpVal == current)) {
      const size = router.query.size ? router.query.size : '10';
      const from = (jumpVal - 1) * parseInt(size as string);

      const pageNo = Math.floor(from / parseInt(size as string) + 1);
      setCurrent(pageNo);

      fetchNewResults(from, 'from');
    }
  }

  function handleButton(val: number) {
    if (!((current == 1 && val == -1) || (current == maxPage && val == 1))) {
      const size = router.query.size ? router.query.size : '10';
      const oldFrom = router.query.from ? router.query.from : '0';

      const from =
        parseInt(oldFrom as string) + val * parseInt(size as string);
      setCurrent((prevCurrent) => prevCurrent + val * 1);

      fetchNewResults(from, 'from');
    }
  }

  return (
    <nav className="pagination">
      <div className="pagination__rows">
        <Dropdown
          default={resultSize}
          options={[10, 20, 50]}
          heading="Rows:&nbsp;"
          handleDropdownChange={handleRowsChange}
        />
      </div>

      <div className="pagination__jump">
        <label className="label-green" htmlFor="jumpNumber">
          Jump to: &nbsp;
          <input
            type="text"
            id="jumpNumber"
            onBlur={(e) => handleJump(e.target.value)}
          />
        </label>
      </div>

      <div className="pagination__control">
        <div className="pagination__page-no">
          Page No. {<span>{page}</span>} of {<span>{maxPage}</span>}
        </div>
        <div className="pagination__buttons">
          <button
            type="button"
            className="pagination__back"
            onClick={() => handleButton(-1)}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.989063 1.12218C0.555729 1.55551 0.555729 2.25551 0.989063 2.68885L5.30017 6.99996L0.989063 11.3111C0.555729 11.7444 0.555729 12.4444 0.989063 12.8777C1.4224 13.3111 2.1224 13.3111 2.55573 12.8777L7.65573 7.77773C8.08906 7.3444 8.08906 6.6444 7.65573 6.21107L2.55573 1.11107C2.13351 0.688845 1.4224 0.688846 0.989063 1.12218Z" />
            </svg>
          </button>
          <button
            type="button"
            className="pagination__next"
            onClick={() => handleButton(1)}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.989063 1.12218C0.555729 1.55551 0.555729 2.25551 0.989063 2.68885L5.30017 6.99996L0.989063 11.3111C0.555729 11.7444 0.555729 12.4444 0.989063 12.8777C1.4224 13.3111 2.1224 13.3111 2.55573 12.8777L7.65573 7.77773C8.08906 7.3444 8.08906 6.6444 7.65573 6.21107L2.55573 1.11107C2.13351 0.688845 1.4224 0.688846 0.989063 1.12218Z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
