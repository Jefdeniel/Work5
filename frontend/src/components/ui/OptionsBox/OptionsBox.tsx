import { useTranslation } from 'react-i18next';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

import './OptionsBox.scss';

interface Props {
  className?: string;
  
}

const OptionsBox = ({ className }: Props) => {
  const { t } = useTranslation(['general']);

  const onEditClickHandler = () => {};

  const onDeleteClickHandler = () => {};

  // TODO: Add translations
  const editIcon = <Icon src="/icons/edit.svg" alt="Edit icon" />;
  const deleteIcon = <Icon src="/icons/delete.svg" alt="Delete icon" />;

  return (
    <div className={`${className} options-box`}>
      <Button
        isSmall
        icon={editIcon}
        text={`Edit`}
        onClick={onEditClickHandler}
      />

      <div className={`seperator-line`}></div>

      <Button
        isSmall
        icon={deleteIcon}
        text={`Delete`}
        onClick={onDeleteClickHandler}
      />
    </div>
  );
};

export default OptionsBox;
