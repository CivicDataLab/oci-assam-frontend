import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import utils from 'utils';

function postYear(time: string) {
  const nth = function (d: number) {
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
  const date = nth(dt.getDate());
  const month = dt.toLocaleString('default', { month: 'short' });
  return `${date} ${month}, ${dt.getFullYear()}`;
}

function getReadTime(text) {
  const wpm = 250;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

const StoriesCard: React.FC<{ data: any }> = ({ data }) => {
  return (
    <article className="stories-card">
      <img src={utils.getMediumBanner(data['content:encoded'])} alt="" />
      <div className="stories-card__content">
        <h3>{data.title}</h3>
        <p>{data['content:encodedSnippet']}</p>
        <div>
          <small className="stories-card__author">{data.creator}</small>
          <small>{`${postYear(data.isoDate)} . 
                  ${getReadTime(
                    data['content:encodedSnippet']
                  )} mins read`}</small>
        </div>
      </div>
    </article>
  );
};

export default StoriesCard;
