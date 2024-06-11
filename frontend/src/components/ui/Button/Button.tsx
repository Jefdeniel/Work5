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
  isBig?: boolean;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  notification?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = ({
  type,
  color,
  isOutline,
  isBlock,
  isLoading,
  isDanger,
  isSmall,
  isBig,
  icon,
  text,
  style,
  className,
  disabled,
  onClick,
  notification,
  children,
  ...rest
}: Props) => {
  const button = (
    <button
      type={type || 'button'}
      className={`btn ${className}`}
      style={isBig ? { width: '100%', ...style } : style}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <div className="btn__content">
        {notification && <span className="notification">{notification}</span>}
        {icon}
        {text && !isLoading && <span>{text}</span>}
        {isLoading && <Spinner animation="border" size="sm" />}
        {!isLoading && children}
      </div>
    </button>
  );

  if (isBlock) {
    return <div className="d-grid gap-2">{button}</div>;
  }

  return button;
};

export default Button;
