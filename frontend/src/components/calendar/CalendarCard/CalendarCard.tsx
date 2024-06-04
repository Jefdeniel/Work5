import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSettings } from '../../../hooks/useSettings';

import Icon from '../../ui/Icon/Icon';
import IconButton from '../../ui/IconButton/IconButton';
import ProfilePicture from '../../ui/ProfilePicture/ProfilePicture';
import OptionsBox from '../../ui/OptionsBox/OptionsBox';

import './CalendarCard.scss';

export interface CalendarCardProps {
  img: string;
  name: string;
  userAvatars?: string[];
  link?: string;
}

const CalendarCard = ({ img, name, userAvatars, link }: CalendarCardProps) => {
  const navigate = useNavigate();
  const { theme } = useSettings();
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const optionsBoxRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  const handleOptionsClick = () => {
    setAreOptionsVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsBoxRef.current &&
      !optionsBoxRef.current.contains(event.target as Node)
    ) {
      setAreOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`position-relative`}>
      <div className="calendar-card" onClick={handleClick}>
        <img
          className={`calendar-card__img`}
          src={img}
          alt={`thumbnail picture of "${name}" calendar`}
        />

        <div className={`w-100 d-flex justify-content-between`}>
          <div className="calendar-card__content">
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

      {areOptionsVisible && (
        <div ref={optionsBoxRef}>
          <OptionsBox />
        </div>
      )}
    </div>
  );
};

export default CalendarCard;
