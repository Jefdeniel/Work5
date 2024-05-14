interface Props {
  width?: number;
  height?: number;
  pathFill?: string;
  className?: string;
}

const IconSlack = ({ width = 10, height = 10, pathFill, className }: Props) => {
  return (
    <svg
      className={`${className}`}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.572 10.743a1.786 1.786 0 1 1-1.786-1.788h1.786v1.788ZM4.472 10.743a1.786 1.786 0 0 1 3.571 0v4.471a1.786 1.786 0 0 1-3.571 0v-4.471ZM6.257 3.572a1.786 1.786 0 1 1 1.788-1.786v1.786H6.257ZM6.257 4.472a1.786 1.786 0 0 1 0 3.571H1.786a1.786 1.786 0 0 1 0-3.571h4.471ZM13.429 6.257a1.786 1.786 0 1 1 1.785 1.788H13.43V6.257ZM12.528 6.257a1.786 1.786 0 1 1-3.571 0V1.786a1.786 1.786 0 1 1 3.571 0v4.471ZM10.743 13.428a1.785 1.785 0 1 1-1.787 1.786v-1.786h1.787ZM10.743 12.528a1.786 1.786 0 1 1 0-3.571h4.471a1.786 1.786 0 0 1 0 3.571h-4.471Z"
        fill={pathFill || 'var(--sa-primary-950)'}
      />
    </svg>
  );
};

export default IconSlack;
