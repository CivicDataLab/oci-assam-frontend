/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { Key, ReactChild, ReactFragment, ReactPortal } from 'react';

const Item: React.FC<{ datapackage: any; listType: any }> = ({
  datapackage,
  listType,
}) => {
  return (
    <Link
      href={`/@${
        datapackage.organization ? datapackage.organization.name : 'dataset'
      }/${datapackage.name}`}
    >
      <a className="list__link">
        <p className="list__title">{listType}</p>
        <h3 className="list__heading">
          {datapackage.title || datapackage.name}
        </h3>
        <ul className="list__tags">
          {datapackage.tags
            ?.slice(0, 4)
            .map(
              (tag: {
                id: Key;
                name: boolean | ReactChild | ReactFragment | ReactPortal;
              }) => (
                <li key={tag.id}>{tag.name}</li>
              )
            )}
        </ul>
        {/* <Link
        href={`/@${
          datapackage.organization ? datapackage.organization.name : 'dataset'
        }`}
      >
        <a className="text-gray-500 block mt-1">
          {datapackage.organization
            ? datapackage.organization.title
            : 'dataset'}
        </a>
      </Link> */}
        <p className="list__details">
          {datapackage.description || datapackage.notes}
        </p>
      </a>
    </Link>
  );
};

export default Item;
