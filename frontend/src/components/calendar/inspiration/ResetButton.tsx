import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';

const ResetButton = ({ onClick }) => {
  return (
    <Button
      className="btn--danger d-flex"
      type="button"
      onClick={onClick}
      icon={<Icon src="/icons/reset.svg" alt="Reset icon" />}
    />
  );
};

export default ResetButton;
