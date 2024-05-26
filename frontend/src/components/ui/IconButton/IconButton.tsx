import './IconButton.scss';

interface IconButtonProps {
  style?: React.CSSProperties;
  icon: React.ReactNode;
  filled?: boolean;
  className?: string;
  onClick: () => void;
}

const IconButton = ({
  style,
  icon,
  filled,
  className,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      className={`icon-button ${filled ? 'btn--filled' : 'btn--outlined'} ${className}`}
      style={style}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
