import { useEffect, useRef, useState } from 'react';

import { Event } from '../../../@types/Events';

import { useSettings } from '../../../hooks/useSettings';
import ColorConversion from '../../../utils/ColorConversion';
import Icon from '../Icon/Icon';
import {
  HighPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
  VeryHighPriorityIcon,
  VeryLowPriorityIcon,
} from '../Icon/PriorityIcons';
import IconButton from '../IconButton/IconButton';
import OptionsBox from '../OptionsBox/OptionsBox';

import './EventCard.scss';

interface EventProps {
  event: Event;
  color?: string;
  isGoogleEvent?: boolean;
  onDoubleClick?: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const EventCard = ({
  event: { title, location, priority, status, htmlLink, start_time, end_time },
  color,
  isGoogleEvent,
  onDoubleClick,
  onDelete,
  onEdit,
}: EventProps) => {
  const [isOptionsVisible, setIsOptionsVisibility] = useState(false);

  const optionsBoxRef = useRef<HTMLDivElement>(null);
  const { theme } = useSettings();

  const defaultColor = ColorConversion.convertHexToRGBA('#141C57');
  const fadedDefaultColor = ColorConversion.convertHexToRGBA('#141C57', 0.15);
  const rgbaColor = color
    ? ColorConversion.convertHexToRGBA(color, 0.2)
    : fadedDefaultColor;

  let priorityIcon;

  switch (priority) {
    case 'very_low':
      priorityIcon = <VeryLowPriorityIcon className="priority-icon" />;
      break;
    case 'low':
      priorityIcon = <LowPriorityIcon className="priority-icon" />;
      break;
    case 'medium':
      priorityIcon = <MediumPriorityIcon className="priority-icon" />;
      break;
    case 'high':
      priorityIcon = <HighPriorityIcon className="priority-icon" />;
      break;
    case 'very_high':
      priorityIcon = <VeryHighPriorityIcon className="priority-icon" />;
      break;
    default:
      priorityIcon = <MediumPriorityIcon className="priority-icon" />;
  }

  const MAX_LENGTH = 20;
  let trimmedLocation =
    location && location.length > MAX_LENGTH
      ? location.substring(0, MAX_LENGTH)
      : location;

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
    <div
      className="event-card"
      style={{ backgroundColor: rgbaColor }}
      onDoubleClick={onDoubleClick}
    >
      <IconButton
        icon={
          theme === 'dark' ? (
            <Icon
              className={`event-card__options`}
              src="/icons/modify-bright.svg"
              alt="chevron right icon"
            />
          ) : (
            <Icon
              className={`event-card__options`}
              src="/icons/modify.svg"
              alt="chevron right icon"
            />
          )
        }
        onClick={handleOptionsClick}
        className={`event-card__options`}
      />

      {isOptionsVisible && (
        <div ref={optionsBoxRef}>
          <OptionsBox onDelete={onDelete} onEdit={onEdit} />
        </div>
      )}

      <div
        className="event-card__bar"
        style={{
          borderLeft: `10px solid ${color ? color : defaultColor}`,
        }}
      ></div>
      <div>
        <span className="event-card__title">{title}</span>
        {isGoogleEvent && (
          <div>
            <div className="event-card__time">
              <strong>Start: </strong>
              {start_time.toLocaleString()}
            </div>

            <div className="event-card__time">
              <strong>End: </strong>
              {end_time.toLocaleString()}
            </div>
          </div>
        )}
        <div className="event-card__details">
          {location && (
            <div className="event-card__location">
              <strong>Location: </strong>
              {trimmedLocation ?? 'No location specified'}
            </div>
          )}
          {priority && (
            <div className="event-card__priority">
              <strong>Priority: </strong>
              {priorityIcon}
            </div>
          )}
          {status && (
            <div className="event-card__status">
              <strong>Status: </strong>
              {status}
            </div>
          )}
          {isGoogleEvent && (
            <p className="text-gray-700">
              <a
                href={htmlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View on Google Calendar
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
