import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { TimeBlock } from '../../../@types/TimeBlock';
import { Calendar } from '../../../@types/Calendar';

import useFetch from '../../../hooks/useFetch';
import Button from '../../ui/Button/Button';
import AddTimeBlockingModal from '../Modals/AddTimeBlockingModal';
import Icon from '../../ui/Icon/Icon';

import './Input.scss';

interface Props {
  calendar: Calendar;
}

const TimeBlockingSelector = ({ calendar }: Props) => {
  const { t } = useTranslation(['calendar']);

  // State
  const [showAddTimeBlockingModal, setShowAddTimeBlockingModal] =
    useState(false);

  // const timeBlocks = calendar?.timeblocks;

  const { fetchData: deleteTimeBlock } = useFetch('DELETE', ['timeblocks']);

  const handleDeleteTimeBlock = async (timeBlockId: number) => {
    console.log('timeBlockId:', timeBlockId);

    try {
      // TODO: Add translations
      const response = await deleteTimeBlock({ id: timeBlockId?.toString() });

      if (response.ok) {
        toast.success('Deleted Time Block');
      } else {
        toast.error('Failed to delete Time Block');
      }
    } catch (error) {
      console.error('Error deleting Time Block:', error);
      toast.error('Error deleting Time Block');
    }
  };

  const handleOpenTimeBlockingModal = () => {
    setShowAddTimeBlockingModal(true);
  };

  const closeAddTimeBlockingModal = () => {
    setShowAddTimeBlockingModal(false);
  };

  const handleAddTimeBlock = (newTimeBlock) => {
    toast.success('newTimeBlock:', newTimeBlock);
  };

  return (
    <>
      <div className={`input-intro`}>
        <span className={`title mb-1`}>
          {t('calendar:calendar-customize.time-blocking.title')}
        </span>

        <p className={`w-75 customize-intro`}>
          {t('calendar:calendar-customize.time-blocking.description')}
        </p>
      </div>

      <div className={`d-flex align-items-center gap-3`}>
        <ul>
          {/* TODO: Add Translations */}
          {calendar?.timeblocks && calendar.timeblocks.length === 0 && (
            <li>No time blockers yet</li>
          )}

          {calendar?.timeblocks &&
            calendar.timeblocks.length > 0 &&
            calendar.timeblocks.map((timeBlock) => (
              <li key={timeBlock.id} className={`timeblock-item`}>
                <Button
                  className={`btn--bordered-primary`}
                  onClick={() => handleDeleteTimeBlock(timeBlock.id!)}
                  text={timeBlock.title}
                />
              </li>
            ))}
        </ul>

        <Button
          className={`btn--primary mb-3`}
          onClick={handleOpenTimeBlockingModal}
          icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
          text={t('calendar:calendar-customize.time-blocking.title')}
        />

        {showAddTimeBlockingModal && (
          <AddTimeBlockingModal
            onClose={closeAddTimeBlockingModal}
            setTimeBlock={handleAddTimeBlock}
          />
        )}
      </div>
    </>
  );
};

export default TimeBlockingSelector;
