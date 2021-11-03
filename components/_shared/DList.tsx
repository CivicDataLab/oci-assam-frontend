const DList = ({ content }) => {
  return (
    <dl className="dlist">
      {content.map((value: any, index: number) => {
        return (
          <div key={index}>
            <dt className="dlist__title">
              {value.title}
              {value.tooltip && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    fill="#045105"
                    d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.6 9H5.4V5.4h1.2V9Zm0-4.8H5.4V3h1.2v1.2Z"
                  />
                </svg>
              )}
            </dt>
            <dd className="dlist__desc">{value.desc}</dd>
          </div>
        );
      })}
    </dl>
  );
};

export default DList;
