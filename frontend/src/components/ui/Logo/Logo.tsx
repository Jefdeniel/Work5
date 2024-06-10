import './Logo.scss';

interface LogoProps {
  width: string;
  height: string;
  className?: string;
}

const Logo = ({ width, height, className }: LogoProps) => {
  const logoSrc = '/logo/logo.svg';

  return (
    <div className={`logo ${className}`}>
      <img
        src={logoSrc}
        style={{ width, height, objectFit: 'contain' }}
        alt="Smart Calendar Logo"
      />
    </div>
  );
};

export default Logo;
