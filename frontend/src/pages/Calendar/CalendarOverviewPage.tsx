import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useSetTitle from '../../hooks/setTitle';
import { useSettings } from '../../hooks/useSettings';
import { CalendarContext } from '../../store/CalendarContext';

const CalendarOverviewPage = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar:calendar.title'));
  const { theme } = useSettings();

  const contextUserCalendars = useContext(CalendarContext);
  const userCalendars = contextUserCalendars.calendars;

  // it now only works if a user has 1 calendar, not if the user has more calendars.
  // /api/calendars/?id=1&id=2&id=3
  // const params = `?id=${userCalendars}`;
  // const calendarIds = userCalendars.map((calendar) => calendar.id).join(',');

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

      {/* <Heading level={1}>{t('calendar:calendar.page')}</Heading>
      <p>Calendar Overview Page</p>
      <Heading level={2}>DB Fetch</Heading>
      <ul>
        {calendars.map((calendar) => (
          <li key={calendar.id}>{calendar.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default CalendarOverviewPage;
