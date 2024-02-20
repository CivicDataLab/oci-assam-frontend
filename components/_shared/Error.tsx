const ErrorMessage: React.FC<{ message: any }> = ({ message }) => {
  return (
    <aside
      style={{
        padding: '1.5em',
        fontSize: '14px',
        color: 'white',
        backgroundColor: 'red',
      }}
    >
      {message}
    </aside>
  );
};

export default ErrorMessage;
