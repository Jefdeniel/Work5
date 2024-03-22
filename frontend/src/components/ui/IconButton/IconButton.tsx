import './IconButton.css';

interface IconButtonProps {
  style?: React.CSSProperties;
  icon: React.ReactNode;
  onClick: () => void;
}

const IconButton = ({ style, icon, onClick }: IconButtonProps) => {
  return (
    <button className="icon-button" style={style} onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;
