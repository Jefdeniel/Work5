import './Button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
}

const BackButton = ({ text, className }: Props) => {
  const button = (
    <button
      className={`btn btn--bordered ${className}`}
      onClick={() => {
        window.history.back();
      }}
    >
      <svg
        className="btn__icon"
        width="14"
        height="18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.683 10.271c-.91-.702-.91-1.844 0-2.547l9.33-7.197c.67-.517 1.67-.669 2.544-.388C13.43.42 14 1.073 14 1.804v14.394c0 .725-.569 1.383-1.443 1.664-.875.281-1.873.124-2.544-.388l-9.33-7.197v-.006Z"
          fill="var(--sa-primary-950)"
        />
      </svg>

      <span className="pl-2">{text}</span>
    </button>
  );

  return button;
};

export default BackButton;
