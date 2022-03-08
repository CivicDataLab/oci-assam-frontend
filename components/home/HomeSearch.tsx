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
        <a className="home-search__category" href="/datasets?fq=&q=health">
          <img src="/assets/icons/health.svg" alt="" />
          <h3>Health Related Tenders</h3>
        </a>
        <a className="home-search__category" href="/datasets?fq=&q=water">
          <img src="/assets/icons/water.svg" alt="" />
          <h3>Water and Sanitation</h3>
        </a>
        <a className="home-search__category" href="/datasets?fq=&q=flood">
          <img src="/assets/icons/flood.svg" alt="" />
          <h3>Flood Management and Relief</h3>
        </a>
      </div>
      <a href="/datasets" className="btn-primary home-search__button">
        View Contracts Data
      </a>
    </section>
  );
};

export default HomeSearch;
