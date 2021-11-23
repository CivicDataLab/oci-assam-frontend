import Card from './Card';

const List: React.FC<{ data: any }> = ({ data }) => {
  return (
    <ul className="list">
      {data.map((pkg: any, index: number) => (
        <li key={`list-${index}`} className="list__item">
          <Card datapackage={pkg} />
        </li>
      ))}
    </ul>
  );
};

export default List;
