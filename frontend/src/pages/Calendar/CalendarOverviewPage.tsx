import { useTranslation } from 'react-i18next';
import useSetTitle from '../../hooks/setTitle';
import { useSettings } from '../../hooks/useSettings';

const CalendarOverviewPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:calendar.title'));
  const { theme } = useSettings();

  return (
    <div className={`pattern-block`}>
      {theme === 'dark' ? (
        <img
          className={`back-pattern`}
          src="/img/back-pattern-bright.png"
          alt="Background pattern"
        />
      ) : (
        <img
          className={`back-pattern`}
          src="/img/back-pattern.png"
          alt="Background pattern"
        />
      )}
    </div>
  );
};

export default CalendarOverviewPage;
