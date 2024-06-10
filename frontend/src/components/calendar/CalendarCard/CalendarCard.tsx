import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSettings } from '../../../hooks/useSettings';

import { CalendarCardProps } from '../../../@types/CalendarCard';
import Icon from '../../ui/Icon/Icon';
import IconButton from '../../ui/IconButton/IconButton';
import ProfilePicture from '../../ui/ProfilePicture/ProfilePicture';
import OptionsBox from '../../ui/OptionsBox/OptionsBox';

import './CalendarCard.scss';

const CalendarCard = ({
  img,
  name,
  userAvatars,
  link,
  onDelete,
  onEdit,
}: CalendarCardProps) => {
  const navigate = useNavigate();
  const { theme } = useSettings();
  const [isOptionsVisible, setIsOptionsVisibility] = useState(false);
  const optionsBoxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  const handleOptionsClick = () => {
    setIsOptionsVisibility((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsBoxRef.current &&
      !optionsBoxRef.current.contains(event.target as Node)
    ) {
      setIsOptionsVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <li className={`position-relative`}>
      <div className="calendar-card">
        <img
          className={`calendar-card__img`}
          src={img}
          alt={`thumbnail picture of "${name}" calendar`}
        />

        <div className={`w-100 d-flex justify-content-between`}>
          <div className="calendar-card__content" onClick={handleClick}>
            <span className="heading heading--sm calendar-card__title">
              {name}
            </span>

            <ul className={`calendar-card__user-list`}>
              {userAvatars?.map((avatar, index) => (
                <li key={index}>
                  {avatar ? (
                    <ProfilePicture
                      isSmall
                      src={avatar}
                      alt="User profile image"
                    />
                  ) : (
                    <Icon
                      src="/icons/user-profile.svg"
                      alt="User profile icon"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <IconButton
            icon={
              theme === 'dark' ? (
                <Icon
                  className={`calendar-card__options`}
                  src="/icons/modify-bright.svg"
                  alt="chevron right icon"
                />
              ) : (
                <Icon
                  className={`calendar-card__options`}
                  src="/icons/modify.svg"
                  alt="chevron right icon"
                />
              )
            }
            onClick={handleOptionsClick}
            className={`calendar-card__options`}
          />
        </div>
      </div>

      {isOptionsVisible && (
        <div ref={optionsBoxRef}>
          <OptionsBox onDelete={onDelete} onEdit={onEdit} />
        </div>
      )}
    </li>
  );
};

export default CalendarCard;
