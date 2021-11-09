import Search from 'components/datasets/Search';

const HomeSearch = () => {
  return (
    <section className="home-search container">
      <h2 className="heading-w-line">Search tender data of Assam</h2>
      <Search />
      <div className="home-search__icons">
        <div className="home-search__category">
          <img src="/assets/icons/covid.svg" alt="" />
          <h3>Covid related tenders</h3>
        </div>
        <div className="home-search__category">
          <img src="/assets/icons/health.svg" alt="" />
          <h3>Health related tenders</h3>
        </div>
        <div className="home-search__category">
          <img src="/assets/icons/water.svg" alt="" />
          <h3>Water and Sanitation</h3>
        </div>
        <div className="home-search__category">
          <img src="/assets/icons/food.svg" alt="" />
          <h3>Food management and relief</h3>
        </div>
      </div>
      <a href="/datasets" className="button-primary home-search__button">
        View Contracts Data
      </a>
    </section>
  );
};

export default HomeSearch;
