import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMediumBanner } from 'utils/index';
import { truncate } from 'lodash';

// Strip HTML tags
function strip(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

function getReadTime(text) {
  const wpm = 250;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

const StoriesCard: React.FC<{ data: any; length: number }> = ({ data, length }) => {
  const [paraLen, setParaLen] = useState(length);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (window.innerWidth < 720) {
      setParaLen(150);
    }

    const textContent = data['content:encoded'] ? strip(data['content:encoded']) : '';
    setContent(textContent);
  }, [data]);

  return (
    <article className="stories-card">
      <Link href={data.link[0]}>
        <a>
          <img src={getMediumBanner(data['content:encoded'])} alt="" />
        </a>
      </Link>

      <div className="stories-card__content">
        <Link href={data.link[0]}>
          <a>
            <h3>{data.title}</h3>

            <p>
              {truncate(content, {
                length: paraLen,
              })}
            </p>
          </a>
        </Link>

        <div className="stories-card__footer">
          <div>
            <small className="stories-card__author">{data['dc:creator']}</small>
            <small>{`${data.pubDate} · ${getReadTime(content)} mins read`}</small>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoriesCard;
