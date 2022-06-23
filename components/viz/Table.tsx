import React, { Fragment, useRef, useState, useEffect, useMemo } from 'react';

const Arrow = ({ sortDir, isCurrent, sort }) => {
  const ascending = sortDir === 'ascending';
  return (
    <svg viewBox="0 0 100 200" width="100" height="200">
      {sort}
      {!(!ascending && isCurrent) && <polyline points="20 50, 50 20, 80 50" />}
      <line x1="50" y1="20" x2="50" y2="180" />
      {!(ascending && isCurrent) && (
        <polyline points="20 150, 50 180, 80 150" />
      )}
    </svg>
  );
};

//Function can be seen as general and not needed in the component
//scope. This also removes the need to declare it in the
//dependency arrays of hooks such as useMemo.
const sortRowsByIndex = (rows, sortedIndex, sortedDirection) =>
  rows.slice(0).sort((a, b) => {
    if (sortedDirection === 'ascending') {
      return a[sortedIndex] > b[sortedIndex]
        ? 1
        : a[sortedIndex] < b[sortedIndex]
        ? -1
        : 0;
    } else {
      return a[sortedIndex] < b[sortedIndex]
        ? 1
        : a[sortedIndex] > b[sortedIndex]
        ? -1
        : 0;
    }
  });

const Table = ({ headers, rows, caption, sortable }) => {
  const container = useRef(null);
  //The captionID is calculated and stored as init value of a ref.
  //This ensures that the ID remains constant for all renders.
  const captionID = useRef(`caption-${rows[0]}`);
  const [tabIndex, setTabIndex] = useState(null);
  //The following two state vars could be combined into an object,
  //but keeping them separate makes the usage cleaner. It is a matter
  //of taste.
  const [sortedBy, setSortedBy] = useState(null);
  const [sortDir, setSortDir] = useState('none');

  //Declaring useEffect with an empty deps array is the same
  //as componentDidMount in React class components.
  useEffect(() => {
    const { scrollWidth, clientWidth } = container.current;
    const scrollable = scrollWidth > clientWidth;
    setTabIndex(scrollable ? '0' : null);
  }, [headers]);

  //The sorted rows are calculated directly from the prop. There is no need to
  //repeat it on state. However, in a real world table example one would probably
  //not want to recalc this with every render. So the useMemo hook is used to
  //memoize the return value unless the related state changes.
  const sortedRows = useMemo(
    () => sortRowsByIndex(rows, sortedBy, sortDir),
    [rows, sortedBy, sortDir]
  );

  const sortBy = (i) => {
    let updatedSortDir;
    const ascending = sortDir === 'ascending';
    if (i === sortedBy) {
      updatedSortDir = !ascending ? 'ascending' : 'descending';
    } else {
      updatedSortDir = 'ascending';
    }
    setSortedBy(i);
    setSortDir(updatedSortDir);
  };

  return (
    <Fragment>
      <div
        className="table-container"
        ref={container}
        tabIndex={tabIndex}
        aria-labelledby={captionID.current}
        role="group"
      >
        <table>
          <caption id={captionID.current}>
            <span className="sr-only">{caption}</span>
            {tabIndex === '0' && (
              <div>
                <small>(scroll to see more)</small>
              </div>
            )}
          </caption>
          <tbody>
            <tr>
              {headers.map((header, i) => (
                <th
                  role="columnheader"
                  scope="col"
                  key={i}
                  // aria-sort={sortedBy === i ? sortDir : "none"}
                >
                  {header}
                  {sortable && (
                    <button onClick={() => sortBy(i)}>
                      <Arrow
                        sortDir={sortDir}
                        isCurrent={sortedBy === i}
                        sort={
                          <span className="sr-only">
                            sort by {header} in{' '}
                            {sortDir !== 'ascending'
                              ? 'ascending'
                              : 'descending'}{' '}
                            order
                          </span>
                        }
                      />
                    </button>
                  )}
                </th>
              ))}
            </tr>
            {sortedRows.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;
