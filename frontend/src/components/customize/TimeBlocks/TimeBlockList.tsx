import { TimeBlock } from '../../../@types/TimeBlock';
import styles from './TimeBlockList.module.scss';

interface Props {
  timeBlocks: TimeBlock[];
}

const TimeBlockList = ({ timeBlocks }: Props) => {
  return (
    <div className={styles['time-block-list']}>
      {timeBlocks.map((timeBlock) => (
        <div key={timeBlock.id} className={styles['time-block-item']}>
          <strong>{timeBlock.title}</strong>
          <p>
            {new Date(timeBlock.start_time).toLocaleString()} -{' '}
            {new Date(timeBlock.end_time).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TimeBlockList;
