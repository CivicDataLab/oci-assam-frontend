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
    <Link href={data.link}>
      <a className="stories-card">
        <article>
          <img src={utils.getMediumBanner(data['content:encoded'])} alt="" />
          <div className="stories-card__content">
            <h3>{data.title}</h3>
            <p>
              {truncate(data['content:encodedSnippet'], {
                length: paraLen,
              })}
            </p>
            <div>
              <small className="stories-card__author">{data.creator}</small>
              <small>{`${getDate(data.isoDate)} . 
                  ${getReadTime(
                    data['content:encodedSnippet']
                  )} mins read`}</small>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default StoriesCard;
