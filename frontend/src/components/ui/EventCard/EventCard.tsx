import { Event } from '../../../@types/Events';
import ColorConversion from '../../../utils/ColorConversion';
import {
  VeryLowPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
  HighPriorityIcon,
  VeryHighPriorityIcon,
} from '../Icon/PriorityIcons';

interface EventProps {
  event: Event;
  color?: string;
  isGoogleEvent?: boolean;
  onDoubleClick?: () => void;
}

// Color has to be in HEX format
const EventCard = ({
  event: { title, location, priority, status, htmlLink, start_time, end_time },
  color,
  isGoogleEvent,
  onDoubleClick,
}: EventProps) => {
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

  return (
    <div
      className="event-card"
      style={{ backgroundColor: rgbaColor }}
      onDoubleClick={onDoubleClick}
    >
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
              {/* TODO: add translations */}
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
