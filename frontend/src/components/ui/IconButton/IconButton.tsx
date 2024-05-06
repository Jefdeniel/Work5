import './IconButton.scss';

interface IconButtonProps {
  style?: React.CSSProperties;
  icon: React.ReactNode;
  filled?: boolean;
  onClick: () => void;
}

const IconButton = ({ style, icon, filled, onClick }: IconButtonProps) => {
  return (
    <button
      className={`icon-button ${filled ? 'btn--filled' : 'btn--outlined'}`}
      style={style}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
