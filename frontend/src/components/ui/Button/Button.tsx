import Spinner from '../Loading/Spinner';

import './button.css';

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
      {icon && <span className="button-icon">{icon}</span>}

      {text && !isLoading && <span>{text}</span>}
      
      {isLoading && <Spinner />}
    </button>
  );

  return button;
};

export default Button;
