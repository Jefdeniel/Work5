import { TimeBlockCardType } from '../../../../../@types/TimeBlockCard';

import './TimeBlockCard.scss';

const TimeBlockCard = ({ title }: TimeBlockCardType) => {
  return (
    <div className={`timeblock-card`}>
      <span className={`timeblock-card__title`}>Time block: {title}</span>
    </div>
  );
};

export default TimeBlockCard;
