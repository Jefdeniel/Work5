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
  onDoubleClick?: () => void;
}

// Color has to be in hex format
const EventCard = ({
  event: { title, location, priority, status },
  color,
  onDoubleClick,
}: EventProps) => {
  const defaultColor = ColorConversion.convertHexToRGBA('#141C57');
  const fadedDefaultColor = ColorConversion.convertHexToRGBA('#141C57', 0.15);
  const rgbaColor = color
    ? ColorConversion.convertHexToRGBA(color, 0.2)
    : fadedDefaultColor;

  console.log('Event Props:', { title, location, priority, status });

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

  const maxLength = 20;
  const trimmedlocation =
    location.length > maxLength
      ? location.substring(0, maxLength) // Truncate without adding ellipsis
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
        <div className="event-card__details">
          {location && (
            <div className="event-card__location">
              <strong>Location: </strong>
              {trimmedlocation}
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
        </div>
      </div>
    </div>
  );
};

export default EventCard;
