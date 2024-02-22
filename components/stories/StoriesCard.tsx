import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMediumBanner } from 'utils/index';
import { truncate } from 'lodash';

// strip html tags
function strip(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
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
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 720) {
      paraLen > 150 ? setParaLen(150) : null;
    }

    setContent(strip(data['content']));
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
              {truncate(content ? content : data['content'], {
                length: paraLen,
              })}
            </p>
          </a>
        </Link>

        <div className="stories-card__footer">
          <div>
            <small className="stories-card__author">{data.author}</small>
            <small>
              {`${data.pubDate} . 
                  ${getReadTime(data['content'])} mins read`}
            </small>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoriesCard;
