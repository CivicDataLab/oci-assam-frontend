import Search from 'components/datasets/Search';

const Tenders = () => {
  return (
    <section className="tenders">
      <h2 className="headling-w-line">Search tender data of Assam</h2>
      <Search />
      <div className="tenders__icons">
        <div className="tenders__category">
          <img src="/assets/icons/covid.svg" alt="" />
          <h3>Covid related tenders</h3>
        </div>
        <div className="tenders__category">
          <img src="/assets/icons/health.svg" alt="" />
          <h3>Health related tenders</h3>
        </div>
        <div className="tenders__category">
          <img src="/assets/icons/water.svg" alt="" />
          <h3>Water and Sanitation</h3>
        </div>
        <div className="tenders__category">
          <img src="/assets/icons/food.svg" alt="" />
          <h3>Food management and relief</h3>
        </div>
      </div>
      <button className="button-primary tenders__button">
        View Contracts Data
      </button>
    </section>
  );
};

export default Tenders;
