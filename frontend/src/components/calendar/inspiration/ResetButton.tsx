import { useTranslation } from 'react-i18next';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';

interface ResetButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const ResetButton = ({ onClick, isLoading }: ResetButtonProps) => {
  return (
    <Button
      className="btn--small btn--danger d-flex"
      type="button"
      onClick={onClick}
      icon={<Icon src="/icons/reset.svg" alt="Reset icon" />}
      isLoading={isLoading}
    />
  );
};

export default ResetButton;
