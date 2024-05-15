import './CalendarCard.scss';

interface Props {
  img: string;
  name: string;
  peopleAvatars: string[];
}

const CalendarCard = ({ img, name, peopleAvatars }: Props) => {
  return (
    <div className="calendar-card">
      <img src={img} alt={`thumbnail picture of "${name}" calendar`} />

      <div className="calendar-card__content">
        <span className="heading heading--md">{name}</span>

        <div className="calendar-card__avatars">
          {peopleAvatars.map((avatar, index) => (
            <img key={index} src={avatar} alt="avatar" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
