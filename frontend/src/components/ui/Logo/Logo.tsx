import './logo.scss';

interface LogoProps {
  width: string;
  height: string;
}

const Logo = ({ width, height }: LogoProps) => {
  const logoSrc = 'logo.jpg';

  return (
    <div className="logo">
      <img
        src={logoSrc}
        style={{ width, height, objectFit: 'contain' }}
        alt="Agenda Logo"
      />
    </div>
  );
};

export default Logo;
