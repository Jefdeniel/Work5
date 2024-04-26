import './button.css';
import { Spinner } from '../Loading/Sp

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
        {isLoading && <Spinner animation="border" size="sm" />}
      </div>
    </button>
  );

  return button;
};

export default Button;




//   const button = (
//     <button
//       type={type}
//       className={`${getButtonClasses()} btn`}
//       style={style}
//       // color={color}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={onClick}
//       disabled={disabled}
//       {...rest}
//     >
//       <div className={styles['button-content']}>
//         {icon && <span className={styles['button-icon']}>{icon}</span>}
//         {/* {text && !isLoading && <span>{text}</span>} */}
//         {/* {isLoading && <Spinner animation="border" size="sm" />} */}
//         {children}
//       </div>
//     </button>
//   );

//   return button;
// };

// export default Button;
