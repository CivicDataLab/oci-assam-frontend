const Carousel = () => {
  return (
    <section className="carousel">
      <div className="container">
        <button className="carousel__prev">
          <span className="sr-only">Previous Slide</span>
          <svg
            width="14"
            height="24"
            viewBox="0 0 14 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7158 2.8L11.121 0L0.000213623 12L11.121 24L13.7158 21.2L5.1899 12L13.7158 2.8Z"
              fill="#075E54"
            />
          </svg>
        </button>
        <div className="carousel__content">
          <article>
            <h2>Did you Know ?</h2>
            <p>
              The Assam Public Procurement Rules, which were approved by the
              cabinet in September 2020 have now been brought into force with
              effect from 1st September 2021.
            </p>
            <a href="/">Click to know more</a>
          </article>
          <figure>
            <img src="/assets/icons/assam.png" alt="" />
          </figure>
        </div>
        <button className="carousel__next">
          <span className="sr-only">Previous Slide</span>
          <svg
            width="14"
            height="24"
            viewBox="0 0 14 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7158 2.8L11.121 0L0.000213623 12L11.121 24L13.7158 21.2L5.1899 12L13.7158 2.8Z"
              fill="#075E54"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
