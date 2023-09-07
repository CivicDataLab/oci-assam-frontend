import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMediumBanner } from 'utils/index';
import { truncate } from 'lodash';

// strip html tags
function strip(html){
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
} 

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
          <img src={getMediumBanner(data['content'])} alt="" />
        </a>
      </Link>

      <div className="stories-card__content">
        <Link href={data.link}>
          <a>
            <h3>{data.title}</h3>

            <p>
              {truncate(strip(data['content']), {
                length: paraLen,
              })}
            </p>
          </a>
        </Link>

        <div className="stories-card__footer">
          <div>
            <small className="stories-card__author">{data.author}</small>
            <small>
              {`${(data.pubDate)} . 
                  ${getReadTime(data['content'])} mins read`}
            </small>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoriesCard;
