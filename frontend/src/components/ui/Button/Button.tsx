import { Spinner } from 'react-bootstrap';
import './Button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  isOutline?: boolean;
  isBlock?: boolean;
  isLoading?: boolean;
  isDanger?: boolean;
  isSmall?: boolean;
  icon?: React.ReactNode;
  text?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  type,
  color,
  isOutline,
  isBlock,
  isLoading,
  isDanger,
  isSmall,
  icon,
  text,
  style,
  className,
  disabled,
  onClick,
  children,
  ...rest
}: Props) => {
  const button = (
    <button
      type={type}
      className={`button ${className}`}
      style={style}
      color={color}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <div className={`button-content`}>
        {icon && <span className={`button-icon`}>{icon}</span>}
        {text && !isLoading && <span>{text}</span>}
        {isLoading && <Spinner animation="border" size="sm" />}
        {children}
      </div>
    </button>
  );

  if (isBlock) {
    return <div className="d-grid gap-2">{button}</div>;
  }

  return button;
};

export default Button;
