import { useRouter } from 'next/router';
import Search from 'components/datasets/Search';

const HomeSearch = () => {
  const router = useRouter();

  function handleRouteChange(val: any) {
    router.push({
      pathname: '/datasets',
      query: { q: val.value },
    });
  }
  return (
    <section className="home-search container">
      <h2 className="heading-w-line">Search from Tender Data of Assam</h2>
      <Search newSearch={handleRouteChange} />
      <div className="home-search__icons">
        <div className="home-search__category">
          <img src="/assets/icons/covid.svg" alt="" />
          <h3>Covid Related Tenders</h3>
        </div>
        <div className="home-search__category">
          <img src="/assets/icons/health.svg" alt="" />
          <h3>Health Related Tenders</h3>
        </div>
        <div className="home-search__category">
          <img src="/assets/icons/water.svg" alt="" />
          <h3>Water and Sanitation</h3>
        </div>
        <div className="home-search__category">
          <img src="/assets/icons/flood.svg" alt="" />
          <h3>Flood Management and Relief</h3>
        </div>
      </div>
      <a href="/datasets" className="btn-primary home-search__button">
        View Contracts Data
      </a>
    </section>
  );
};

export default HomeSearch;
