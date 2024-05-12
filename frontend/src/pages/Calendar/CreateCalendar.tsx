import useSetTitle from '../../hooks/setTitle';
import bg from '/img/bg/emptyCalendar.svg';

const CreateCalendar = () => {
  useSetTitle('CreateCalendar');
  return (
    <div className="h-100" style={{ backgroundImage: `url(${bg})` }}>
      Create calendar
    </div>
  );
};

export default CreateCalendar;
