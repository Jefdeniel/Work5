const BackButton = () => {
  return (
    <div
      className="text-muted d-flex align-items-center m-2"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        window.history.back();
      }}
    >
      <img src="/icons/arrow-left.svg" alt="back" />
    </div>
  );
};

export default BackButton;
