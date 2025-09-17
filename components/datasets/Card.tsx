/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { truncate, capitalize } from 'lodash';
import { getOrgLogo } from 'utils/index';

const Card: React.FC<{ datapackage: any }> = ({ datapackage }) => {
  const router = useRouter();

  return (
    <Link href={`${router.pathname}/${datapackage.name}`}>
      <a className="card__link">
        <figure>
          {datapackage.organization.image_url.length > 0 ? (
            <Image
              className="card__image"
              src={getOrgLogo(datapackage.organization.image_url)}
              width={60}
              height={60}
              layout="fixed"
            />
          ) : (
            <Image
              className="card__image"
              src="/assets/images/assam.jpg"
              width={60}
              height={60}
              layout="fixed"
            />
          )}
        </figure>
        <section>
          <h3 className="card__heading">{datapackage && datapackage.organization && datapackage.organization.title}</h3>
          <small className="card__date">
            {datapackage && datapackage.tender && datapackage.tender[0] && datapackage.tender[0].bidOpening && datapackage.tender[0].bidOpening[0] && datapackage.tender[0].bidOpening[0].date &&
              datapackage.tender[0].fiscalYear &&
              `${datapackage.tender[0].bidOpening[0].date} . ${datapackage.tender[0].fiscalYear}`}
          </small>
          <div className="card__content">
            <section className="card__id">
              <h4>
                {datapackage && datapackage.tender && datapackage.tender[0] && datapackage.tender[0].id &&
                  truncate(datapackage.tender[0].id, {
                    length: 40,
                  })}
              </h4>
              <small>Tender ID</small>
            </section>
            <section className="card__value">
              <h4>
                {datapackage && datapackage.tender && datapackage.tender[0] && datapackage.tender[0].value && datapackage.tender[0].value[0] ?
                  `${datapackage.tender[0].value[0].currency} ${String(
                    datapackage.tender[0].value[0].amount
                  ).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}`
                  : 'N/A'}
              </h4>
              <small>Tender value</small>
            </section>
            <section className="card__name">
              <h4>
                {datapackage && datapackage.tender && datapackage.tender[0] && datapackage.tender[0].title &&
                  truncate(capitalize(datapackage.tender[0].title), {
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
