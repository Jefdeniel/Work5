import useSetTitle from '../../hooks/setTitle';
import bg from '/img/bg/emptyAgenda.svg';

const CreateAgenda = () => {
  useSetTitle('CreateAgenda');
  return (
    <div className="h-screen bg" style={{ backgroundImage: `url(${bg})` }}>
      Create Agenda
    </div>
  );
};

export default CreateAgenda;
