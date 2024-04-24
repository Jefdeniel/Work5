interface RowProps {
  isReverse?: boolean;
  justifyContent?:
    | 'normal'
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  className?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const Row = ({
  isReverse,
  justifyContent,
  alignItems,
  className,
  xs,
  sm,
  md,
  lg,
  xl,
  children,
}: React.PropsWithChildren<RowProps>) => {
  const justifyClass = justifyContent ? `justify-${justifyContent}` : '';
  const alignClass = alignItems ? `items-${alignItems}` : '';

  const classNames = [
    'flex',
    'flex-row',
    justifyClass,
    alignClass,
    className,
    isReverse && 'flex-row-reverse',
    xs && `sm:flex-col sm:${`sm:flex-col sm:${xs}`}`,
    sm && `md:flex-col md:${`md:flex-col md:${sm}`}`,
    md && `lg:flex-col lg:${`lg:flex-col lg:${md}`}`,
    lg && `xl:flex-col xl:${`xl:flex-col xl:${lg}`}`,
    xl && `2xl:flex-col 2xl:${`2xl:flex-col 2xl:${xl}`}`,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
};

export default Row;
