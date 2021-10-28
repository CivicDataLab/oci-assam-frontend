/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Card: React.FC<{ datapackage: any }> = ({ datapackage }) => {
  const router = useRouter();

  return (
    <Link href={`${router.pathname}/${datapackage.name}`}>
      <a className="card__link">
        <figure>
          <Image
            className="card__image"
            src="/assets/icons/ellipse.png"
            width={60}
            height={60}
          />
        </figure>

        <section>
          <h3 className="card__heading">
            {/* {datapackage.title || datapackage.name} */}
            {datapackage.organization.title}
          </h3>
          <small className="card__date">
            21st September 2016 . 2016 - 2017
          </small>
          <div className="card__content">
            <section className="card__id">
              <h4>2016_HFWD_922_1</h4>
              <small>Tender ID</small>
            </section>
            <section className="card__value">
              <h4>₹11,74,92,775</h4>
              <small>Tender value</small>
            </section>
            <section className="card__name">
              <h4>{datapackage.title}</h4>
              <small>Tender name</small>
            </section>
          </div>
        </section>
      </a>
    </Link>
  );
};

export default Card;
