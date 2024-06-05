import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import './OptionsBox.scss';

interface Props {
  className?: string;
  onDelete: () => void;
  onEdit: () => void;
}

const OptionsBox = ({ className, onDelete, onEdit }: Props) => {
  const { t } = useTranslation(['calendar']);

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

  const EDIT_ICON = <Icon src="/icons/edit.svg" alt="Edit icon" />;
  const DELETE_ICON = <Icon src="/icons/delete.svg" alt="Delete icon" />;

  return (
    <div className={`${className} options-box`}>
      <Button
        isSmall
        icon={EDIT_ICON}
        text={t('calendar:calendar-overview.options.edit')}
        onClick={onEditClickHandler}
      />

      <div className={`seperator-line`}></div>

      <Button
        isSmall
        icon={DELETE_ICON}
        text={t('calendar:calendar-overview.options.delete')}
        onClick={onDeleteClickHandler}
      />
    </div>
  );
};

export default OptionsBox;
