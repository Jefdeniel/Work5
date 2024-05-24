import ColorConversion from '../../../utils/ColorConversion';

import './EventCard.scss';

interface Props {
  title: string;
  color?: string;
  onDoubleClick: () => void;
}

// Color has to be in hex format
const EventCard = ({ title, color, onDoubleClick }: Props) => {
  const defaultColor = ColorConversion.convertHexToRGBA('#141C57');
  const fadedDefaultColor = ColorConversion.convertHexToRGBA('#141C57', 0.15);
  const rgbaColor = color
    ? ColorConversion.convertHexToRGBA(color, 0.2)
    : fadedDefaultColor;

  return (
    <div className={`event-card`} style={{ backgroundColor: rgbaColor }} onDoubleClick={onDoubleClick}>
      <div
        className={`event-card__bar`}
        style={{
          borderLeft: `10px solid ${color ? color : defaultColor}`,
        }}
      ></div>

      <span className={`event-card__title`}>{title}</span>
    </div>
  );
};

export default EventCard;
