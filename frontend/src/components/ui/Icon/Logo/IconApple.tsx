interface Props {
  width?: number;
  height?: number;
  pathFill?: string;
  className?: string;
}

const IconApple = ({ width = 10, height = 10, pathFill, className }: Props) => {
  return (
    <svg
      className={`${className}`}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#a)">
        <mask
          id="b"
          maskUnits="userSpaceOnUse"
          x="1"
          y="0"
          width="15"
          height="18"
        >
          <path d="M1.594 0h13.844v17.001H1.594V0Z" fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path
            d="M13.154 9.033c-.02-2.15 1.758-3.184 1.839-3.235-1-1.463-2.556-1.662-3.11-1.686-1.323-.135-2.583.78-3.255.78-.672 0-1.707-.76-2.805-.739-1.444.022-2.774.838-3.518 2.131-1.498 2.598-.383 6.453 1.078 8.564.715 1.032 1.565 2.194 2.684 2.151 1.079-.043 1.485-.697 2.786-.697 1.3 0 1.668.697 2.805.676 1.158-.024 1.893-1.055 2.602-2.09.819-1.198 1.156-2.358 1.176-2.419-.025-.01-2.258-.865-2.282-3.436Z"
            fill={pathFill || 'var(--sa-primary-950)'}
          />
        </g>
        <path
          d="M11.015 2.715C11.61 1.996 12.01.996 11.9 0c-.855.035-1.89.57-2.504 1.29-.55.634-1.032 1.652-.9 2.629.95.074 1.925-.487 2.52-1.204Z"
          fill={pathFill || 'var(--sa-primary-950)'}
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h17v17H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconApple;
