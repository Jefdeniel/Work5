const Circle = ({ color }: { color: string }) => {
  return (
    <svg
      
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="8" r="7" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="8" cy="8" r="4" fill="transparent" />
    </svg>
  );
};

export default Circle;
