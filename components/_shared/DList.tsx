const DList = ({ content }) => {
  return (
    <dl className="dlist">
      {content.map((value: any, index: number) => {
        return (
          <div key={index}>
            <dt className="dlist__title">{value.title}</dt>
            <dd className="dlist__desc">{value.desc}</dd>
          </div>
        );
      })}
    </dl>
  );
};

export default DList;
