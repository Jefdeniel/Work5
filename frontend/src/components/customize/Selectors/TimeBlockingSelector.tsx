import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Calendar } from '../../../@types/Calendar';
import { TimeBlock } from '../../../@types/TimeBlock';

import useFetch from '../../../hooks/useFetch';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import AddTimeBlockingModal from '../Modals/AddTimeBlockingModal';

import './Input.scss';

interface Props {
  calendar: Calendar;
}

const TimeBlockingSelector = ({ calendar }: Props) => {
  const { t } = useTranslation(['calendar']);

  // State
  const [showAddTimeBlockingModal, setShowAddTimeBlockingModal] =
    useState(false);
  const [timeblocks, setTimeblocks] = useState<TimeBlock[]>(
    calendar.timeblocks || []
  );

  const { fetchData: deleteTimeBlock } = useFetch('DELETE', []); // Kyandro tip: Initializing with an empty array
  const handleDeleteTimeBlock = async (timeBlockId: number) => {
    try {
      // Kyandro tip: Make sure to pass the timeBlockId as part of the requestArray
      const response = await deleteTimeBlock({}, {}, null, true, [
        `timeblocks`,
        timeBlockId.toString(),
      ]);
      if (response.ok) {
        setTimeblocks(timeblocks.filter((block) => block.id !== timeBlockId));
        toast.success(t('calendar:calendar-customize.time-blocking.deleted'));
      } else {
        toast.error(
          t('calendar:calendar-customize.time-blocking.delete-failed')
        );
      }
    } catch (error) {
      console.error('Error deleting Time Block:', error);
      toast.error(t('calendar:calendar-customize.time-blocking.delete-error'));
    }
  };

  const handleOpenTimeBlockingModal = () => {
    setShowAddTimeBlockingModal(true);
  };

  const closeAddTimeBlockingModal = () => {
    setShowAddTimeBlockingModal(false);
  };

  const handleAddTimeBlock = (newTimeBlock: TimeBlock) => {
    setTimeblocks([...timeblocks, newTimeBlock]);
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
        <ul className={`time-blocker-list`}>
          {timeblocks.length === 0 && <li>No time blockers yet</li>}

          {timeblocks.map((timeBlock) => (
            <li key={timeBlock.id} className={`timeblock-item`}>
              <Button
                className={`btn--bordered-primary`}
                onClick={() => handleDeleteTimeBlock(timeBlock.id!)}
                text={timeBlock.title}
              />
            </li>
          ))}

          <li>
            <Button
              className={`btn--primary mb-3`}
              onClick={handleOpenTimeBlockingModal}
              icon={<Icon src="/icons/plus-bright.svg" alt="Plus icon" />}
              text={t('calendar:calendar-customize.time-blocking.title')}
            />
          </li>
        </ul>

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
