import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import utils from 'utils';
import { truncate } from 'lodash';

// return post time in required format
function getDate(time: string) {
  // ordinal suffix for date
  const getOrdinal = function (d: number) {
    let type: string;
    if (d > 3 && d < 21) type = 'th';
    switch (d % 10) {
      case 1:
        type = 'st';
        break;
      case 2:
        type = 'nd';
        break;
      case 3:
        type = 'rd';
        break;
      default:
        type = 'th';
        break;
    }
    return `${d}${type}`;
  };

  const dt = new Date(time);
  const date = getOrdinal(dt.getDate());
  const month = dt.toLocaleString('default', { month: 'short' });
  return `${date} ${month}, ${dt.getFullYear()}`;
}

function getReadTime(text: string) {
  const wpm = 250;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

const StoriesCard: React.FC<{ data: any; length: number }> = ({
  data,
  length,
}) => {
  const [paraLen, setParaLen] = useState(length);
  useEffect(() => {
    if (window.innerWidth < 720) {
      paraLen > 150 ? setParaLen(150) : null;
    }
  }, []);
  return (
    <article className="stories-card">
      <Link href={data.link}>
        <a>
          <img src={utils.getMediumBanner(data['content:encoded'])} alt="" />
        </a>
      </Link>

      <div className="stories-card__content">
        <Link href={data.link}>
          <a>
            <h3>{data.title}</h3>

            <p>
              {truncate(data['content:encodedSnippet'], {
                length: paraLen,
              })}
            </p>
          </a>
        </Link>

        <div className="stories-card__footer">
          <div>
            <small className="stories-card__author">{data.creator}</small>
            <small>
              {`${getDate(data.isoDate)} . 
                  ${getReadTime(data['content:encodedSnippet'])} mins read`}
            </small>
          </div>
          <button type="button">
            <span className="sr-only">Share Article</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L15.4596 1.19696C15.5401 1.00904 15.4981 0.791016 15.3536 0.646447C15.209 0.501877 14.991 0.45989 14.803 0.540427L15 1ZM1 7L0.80304 6.54043C0.630457 6.61439 0.513861 6.77881 0.501148 6.96614C0.488434 7.15348 0.581745 7.33214 0.742752 7.42875L1 7ZM9 15L8.57125 15.2572C8.66786 15.4183 8.84652 15.5116 9.03386 15.4989C9.22119 15.4861 9.38561 15.3695 9.45957 15.197L9 15ZM14.803 0.540427L0.80304 6.54043L1.19696 7.45957L15.197 1.45957L14.803 0.540427ZM0.742752 7.42875L5.74275 10.4287L6.25725 9.57125L1.25725 6.57125L0.742752 7.42875ZM5.57125 10.2572L8.57125 15.2572L9.42875 14.7428L6.42875 9.74275L5.57125 10.2572ZM9.45957 15.197L15.4596 1.19696L14.5404 0.80304L8.54043 14.803L9.45957 15.197ZM14.6464 0.646447L5.64645 9.64645L6.35355 10.3536L15.3536 1.35355L14.6464 0.646447Z"
                fill="#045105"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default StoriesCard;
