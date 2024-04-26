import './button.css';
import Spinner from '../Loading/Spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ type, isLoading, icon, text, className, onClick }: Props) => {
  const button = (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {text}
      <div>
        {icon && <span className="button-icon">{icon}</span>}
        {text && !isLoading && <span>{text}</span>}
        {isLoading && <Spinner />}
      </div>
    </button>
  );

  return button;
};

export default Button;
