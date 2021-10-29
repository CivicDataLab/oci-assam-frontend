import Card from './Card';

const List: React.FC<{ data: any; loading: any }> = ({ data, loading }) => {
  if (loading) return <div>Loading</div>;
  const { result } = data.search;
  return (
    <ul className="list">
      {result.results.map((pkg: any, index: number) => (
        <li key={`list-${index}`} className="list__item">
          <Card datapackage={pkg} />
        </li>
      ))}
    </ul>
  );
};

export default List;
