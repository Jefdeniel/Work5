import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { TimeBlock } from '../../../@types/TimeBlock';

import Button from '../../ui/Button/Button';
import AddTimeBlockingModal from '../../calendar/BigCalendar/Modals/AddTimeBlockingModal';
import Icon from '../../ui/Icon/Icon';

const TimeBlockingSelector = () => {
  const { t } = useTranslation(['calendar']);
  // State
  const [showAddTimeBlockingModal, setShowAddTimeBlockingModal] =
    useState(false);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);

  const handleOpenTimeBlockingModal = () => {
    setShowAddTimeBlockingModal(true);
  };

  const closeAddTimeBlockingModal = () => {
    setShowAddTimeBlockingModal(false);
  };

  const handleAddTimeBlock = (newTimeBlock) => {
    setTimeBlocks([...timeBlocks, newTimeBlock]);
    closeAddTimeBlockingModal();
  };

  return (
    <Row className={`mt-4`}>
      <div className={`input-intro`}>
        <span className={`title mb-1`}>
          {t('calendar:calendar-customize.time-blocking.title')}
        </span>

        <p className={`w-75`}>
          {t('calendar:calendar-customize.time-blocking.description')}
        </p>
      </div>

      <div>
        <ul>
          {/* TODO: */}
          {/* if no timeBlockers -> Show <span>No time blocks yet</span> */}
          {/* if timeBlockers -> Load in <li><Button /></li> to edit when clicked on */}
        </ul>

        <Button
          className={`btn--primary`}
          onClick={handleOpenTimeBlockingModal}
          icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
          text={t('calendar:calendar-customize.time-blocking.title')}
        />

        {showAddTimeBlockingModal && (
          <AddTimeBlockingModal
            onClose={closeAddTimeBlockingModal}
            onSubmit={handleAddTimeBlock}
          />
        )}
      </div>
    </Row>
  );
};

export default TimeBlockingSelector;