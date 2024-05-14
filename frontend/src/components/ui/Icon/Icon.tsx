import './Icon.scss';

interface Props {
  className?: string;
  src: string;
  alt: string;
}

const Icon = ({ className, src, alt }: Props) => {
  return <img className={`icon ${className}`} src={src} alt={alt} />;
};

export default Icon;
