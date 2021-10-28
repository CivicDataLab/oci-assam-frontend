const MegaHeader = ({ data }) => {
  return (
    <section className="mega-header">
      <div className="container">
        <h2>{data.title}</h2>
        <p>{data.content}</p>
      </div>
    </section>
  );
};

export default MegaHeader;
