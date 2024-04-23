import styles from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  isOutline?: boolean;
  isBlock?: boolean;
  // isLoading?: boolean;
  isDanger?: boolean;
  isSmall?: boolean;
  icon?: React.ReactNode;
  text?: string;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({
  type,
  color,
  isOutline,
  isBlock,
  // isLoading,
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
  const getButtonClasses = () => {
    const classes = [];

    classes.push(styles['button-main']);

    if (isOutline) {
      classes.push(
        isDanger
          ? styles['button-danger-outline']
          : styles['button-default-outline']
      );
    } else {
      classes.push(
        isDanger ? styles['button-danger'] : styles['button-default']
      );
    }

    classes.push(isSmall ? styles['button-small'] : '');
    classes.push(color ? styles[`button-${color}`] : '');
    classes.push(className);

    return classes.join(' ');
  };

  const handleMouseEnter = (e: { currentTarget: HTMLButtonElement }) => {
    const { currentTarget } = e;
    currentTarget.classList.add(
      isDanger ? styles['button-danger-hover'] : styles['button-default-hover']
    );
  };

  const handleMouseLeave = (e: { currentTarget: HTMLButtonElement }) => {
    const { currentTarget } = e;
    currentTarget.classList.remove(
      isDanger ? styles['button-danger-hover'] : styles['button-default-hover']
    );
  };

  const button = (
    <button
      type={type}
      className={getButtonClasses()}
      style={style}
      color={color}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <div className={styles['button-content']}>
        {icon && <span className={styles['button-icon']}>{icon}</span>}
        {/* {text && !isLoading && <span>{text}</span>} */}
        {/* {isLoading && <Spinner animation="border" size="sm" />} */}
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
