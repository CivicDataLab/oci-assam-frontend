import Link from 'next/link';
import { ReadMore } from './ReadMore';

const MegaHeader = ({ data }) => {
  return (
    <section className="mega-header">
      <div className="container">
        {data.previousPage && (
          <Link href={data.previousLink}>
            <a>{`< Go Back to ${data.previousPage}`}</a>
          </Link>
        )}
        <h2>
          <ReadMore text={data.title} />
        </h2>
        <p>{data.content}</p>
        {data.date && <p>{data.date}</p>}
      </div>
    </section>
  );
};

export default MegaHeader;
