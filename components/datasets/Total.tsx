const Total: React.FC<{ total: number }> = ({ total }) => {
  return (
    <h3 className="total-datasets">
      {total.toLocaleString('en', { useGrouping: true })} datasets found
    </h3>
  );
};

export default Total;