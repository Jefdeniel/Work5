interface Props {
  width?: number;
  height?: number;
  pathFill?: string;
  className?: string;
}

const IconPlus = ({ width = 10, height = 10, pathFill, className }: Props) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.23 2.23A1.73 1.73 0 0 0 8.5.5a1.73 1.73 0 0 0-1.73 1.73v5.04H1.73A1.73 1.73 0 0 0 0 9c0 .957.774 1.73 1.73 1.73h5.04v5.04a1.73 1.73 0 1 0 3.462 0v-5.04h5.037A1.73 1.73 0 0 0 17 9a1.73 1.73 0 0 0-1.73-1.73h-5.04V2.23Z"
        fill={pathFill || 'var(--sa-primary-950)'}
      />
    </svg>
  );
};

export default IconPlus;
