const Total: React.FC<{ total: number; text?: string }> = ({
  total,
  text,
}) => {
  return (
    <h3 className="total-datasets">
      {total.toLocaleString('en', { useGrouping: true })}{' '}
      {text ? text : 'results'}
    </h3>
  );
};

export default Total;
