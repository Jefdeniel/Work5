import './EventCard.scss';

interface Props {
  title: string;
}

const EventCard = ({ title }: Props) => {
  return (
    <div className={`event-card`}>
      <span>{title}</span>
    </div>
  );
};

export default EventCard;
