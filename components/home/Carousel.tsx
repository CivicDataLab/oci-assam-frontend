import React, { useEffect } from 'react';
import Link from 'next/link';

const data = [
  {
    text: 'The Assam Public Procurement Rules, which were approved by the cabinet in September 2020 have now been brought into force with effect from 1st September 2021.',
    link: '/',
    image: '/assets/icons/assam.png',
  },
  {
    text: 'The Assam Public Procurement Rules 2, which were approved by the cabinet in September 2020 have now been brought into force with effect from 1st September 2021.',
    link: '/',
    image: '/assets/icons/assam.png',
  },
  {
    text: 'The Assam Public Procurement Rules 3, which were approved by the cabinet in September 2020 have now been brought into force with effect from 1st September 2021.',
    link: '/',
    image: '/assets/icons/assam.png',
  },
];

const Carousel = () => {
  let pos = 0;

  function updateCarousel(n: number) {
    if (n == -1 && pos == 0) pos = data.length - 1;
    else if (n == 1 && pos == data.length - 1) pos = 0;
    else pos += n;

    document
      .querySelector(`.carousel__item--current`)
      .classList.remove('carousel__item--current');
    document
      .querySelector(`#carousel-${pos}`)
      .classList.add('carousel__item--current');
  }
  useEffect(() => {
    document
      .querySelector('#carousel-0')
      .classList.add('carousel__item--current');
  }, []);
  return (
    <section className="carousel">
      <div className="container">
        <button
          className="carousel__prev"
          onClick={() => updateCarousel(-1)}
          type="button"
        >
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
        <ul className="carousel__content" aria-live="polite">
          {data.map((item, index) => {
            return (
              <li
                key={`carousel-${index}`}
                id={`carousel-${index}`}
                className="carousel__item"
              >
                <article>
                  <h2>Did you Know?</h2>
                  <p>{item.text}</p>
                  <a href={item.link}>Click to know more</a>
                </article>
                <figure>
                  <img src={item.image} alt="" />
                </figure>
              </li>
            );
          })}
        </ul>
        <button
          className="carousel__next"
          onClick={() => updateCarousel(1)}
          type="button"
        >
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