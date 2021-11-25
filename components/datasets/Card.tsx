/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { truncate } from 'lodash';
import { getDate } from 'utils/index';

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
            {`${getDate(datapackage.tender_bidOpening_date)} . ${
              datapackage.fiscal_year
            }`}
          </small>
          <div className="card__content">
            <section className="card__id">
              <h4>
                {truncate(datapackage.tender_id, {
                  length: 40,
                })}
              </h4>
              <small>Tender ID</small>
            </section>
            <section className="card__value">
              <h4>
                ₹
                {datapackage.tender_participationfees_0_value_amount &&
                  datapackage.tender_participationfees_0_value_amount.replace(
                    /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                    ','
                  )}
              </h4>
              <small>Tender value</small>
            </section>
            <section className="card__name">
              <h4>
                {truncate(datapackage.tender_title, {
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
