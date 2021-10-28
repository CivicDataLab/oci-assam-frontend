import { useQuery } from '@apollo/react-hooks';
import Card from './Card';
import { ErrorMessage } from '../_shared';
import { SEARCH_QUERY } from '../../graphql/queries';

const List: React.FC<{ variables: any }> = ({ variables }) => {
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading search results." />;
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
