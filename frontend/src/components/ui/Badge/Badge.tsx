interface BadgeProps {
  text?: string;
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  color?: string;
  isClickable?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [x: string]: any; // Catch-all for other props
}

const Badge = ({
  text,
  type,
  color,
  isClickable,
  children,
  style,
  ...props
}: BadgeProps) => {
  const badgeClass = `badge rounded-pill ${type ? `bg-${type}` : ''} ${isClickable ? 'cursor-pointer' : ''}`;
  const customStyle = {
    backgroundColor: color,
    color: color ? 'white' : '',
    ...style,
  };

  return (
    <span className={badgeClass} style={customStyle} {...props}>
      {children || text}
    </span>
  );
};

export default Badge;
