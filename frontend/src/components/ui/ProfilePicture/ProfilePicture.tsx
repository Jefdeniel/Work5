import './ProfilePicture.scss';

interface Props {
  src?: string;
  alt?: string;
  isSmall?: boolean;
  isLarge?: boolean;
}

const ProfilePicture = ({ src, alt, isSmall, isLarge }: Props) => {
  return (
    <div className="profile-picture">
      <img
        className={`profile-picture__img 
        ${isSmall ? 'profile-picture--small' : ''} 
        ${isLarge ? 'profile-picture--large' : ''}`}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default ProfilePicture;
