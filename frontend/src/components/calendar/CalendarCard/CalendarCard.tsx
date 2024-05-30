import './CalendarCard.scss';
import Icon from '../../ui/Icon/Icon';
import IconButton from '../../ui/IconButton/IconButton';
import ProfilePicture from '../../ui/ProfilePicture/ProfilePicture';
import { useNavigate } from 'react-router-dom';

interface Props {
  img: string;
  name: string;
  userAvatars?: string[];
  link?: string;
}

const CalendarCard = ({ img, name, userAvatars, link }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };
  return (
    <div className="calendar-card" onClick={handleClick}>
      <img
        className={`calendar-card__img`}
        src={img}
        alt={`thumbnail picture of "${name}" calendar`}
      />

      <div className="calendar-card__content">
        <span className="heading heading--sm calendar-card__title">{name}</span>

        <ul className={`calendar-card__user-list`}>
          {userAvatars.map((avatar, index) => (
            <li key={index}>
              {avatar ? (
                <ProfilePicture isSmall src={avatar} alt="User profile image" />
              ) : (
                <Icon src="/icons/user-profile.svg" alt="User profile icon" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <IconButton
        icon={
          <Icon
            className={`calendar-card__options`}
            src="/icons/modify.svg"
            alt="chevron right icon"
          />
        }
        onClick={() => console.log('modify calendar')}
      />
    </div>
  );
};

export default CalendarCard;
