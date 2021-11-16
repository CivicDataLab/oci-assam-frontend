/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';

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
          <h3 className="card__heading">{datapackage.organization.title}</h3>
          <small className="card__date">
            {`${datapackage.tender_date} . ${datapackage.fiscal_year}`}
          </small>
          <div className="card__content">
            <section className="card__id">
              <h4>
                {truncate(datapackage.name, {
                  length: 40,
                })}
              </h4>
              <small>Tender ID</small>
            </section>
            <section className="card__value">
              <h4>₹{datapackage.tender_value}</h4>
              <small>Tender value</small>
            </section>
            <section className="card__name">
              <h4>
                {truncate(datapackage.title, {
                  length: 80,
                })}
              </h4>
              <small>Tender name</small>
            </section>
          </div>
        </section>
      </a>
    </Link>
  );
};

export default Card;
