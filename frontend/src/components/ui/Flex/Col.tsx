import React from 'react';

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  isReverse?: boolean;
  justifySelf?: string;
  alignSelf?: string;
  className?: string;
  children: React.ReactNode;
}

const Col = ({
  xs,
  sm,
  md,
  lg,
  xl,
  isReverse,
  justifySelf,
  alignSelf,
  children,
}: React.PropsWithChildren<ColProps>) => {
  const classNames = [
    'flex',
    'flex-col',
    justifySelf && `justify-${justifySelf}`,
    alignSelf && `self-${alignSelf}`,
    isReverse && 'flex-col-reverse',
    xs && `sm:w-${xs}`,
    sm && `md:w-${sm}`,
    md && `lg:w-${md}`,
    lg && `xl:w-${lg}`,
    xl && `2xl:w-${xl}`,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames}>{children}</div>;
};

export default Col;
