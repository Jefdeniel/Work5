import './Heading.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  level: number;
  isUnderlined?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function Heading({
  level,
  isUnderlined,
  style,
  className,
  children,
}: Props) {
  const getClasses = () => {
    const classes = [];

    if (isUnderlined) {
      classes.push('underline');
    }

    classes.push(className);

    return classes.join(' ');
  };
  switch (level) {
    case 1:
      return (
        <h1 style={style} className={`heading heading--sm ${getClasses()}`}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 style={style} className={`heading heading--md ${getClasses()}`}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 style={style} className={`heading heading--lg ${getClasses()}`}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 style={style} className={`heading ${getClasses()}`}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 style={style} className={`heading ${getClasses()}`}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 style={style} className={`heading ${getClasses()}`}>
          {children}
        </h6>
      );
    default:
      throw Error('Unknown level');
  }
}
