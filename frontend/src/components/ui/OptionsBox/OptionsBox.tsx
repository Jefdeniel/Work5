import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import { useState } from 'react';
import './OptionsBox.scss';

interface Props {
  className?: string;
  onDelete: () => void;
  onEdit: () => void;
}

const OptionsBox = ({ className, onDelete, onEdit }: Props) => {
  const { t } = useTranslation(['general']);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const onEditClickHandler = () => {
    setEditModalIsOpen(true);
    onEdit();
  };

  const onDeleteClickHandler = () => {
    setDeleteModalIsOpen(true);
    onDelete();
  };

  // TODO: Add translations
  const EDIT_ICON = <Icon src="/icons/edit.svg" alt="Edit icon" />;
  const DELETE_ICON = <Icon src="/icons/delete.svg" alt="Delete icon" />;

  return (
    <div className={`${className} options-box`}>
      <Button
        isSmall
        icon={EDIT_ICON}
        text={`Edit`}
        onClick={onEditClickHandler}
      />

      <div className={`seperator-line`}></div>

      <Button
        isSmall
        icon={DELETE_ICON}
        text={`Delete`}
        onClick={onDeleteClickHandler}
      />
    </div>
  );
};

export default OptionsBox;
