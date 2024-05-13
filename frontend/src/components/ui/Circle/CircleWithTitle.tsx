const CircleWithTitle = ({
  color,
  title,
  onClick,
}: {
  color: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 16 16"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <circle cx="8" cy="8" r="7" fill={color} stroke="none" />
        <circle cx="8" cy="8" r="5" fill="var(--sa-bright)" />
      </svg>
      <span style={{ marginLeft: '10px' }}>{title}</span>
    </div>
  );
};

export default CircleWithTitle;
