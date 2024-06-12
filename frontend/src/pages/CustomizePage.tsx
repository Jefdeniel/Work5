import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Calendar } from '../@types/Calendar';
import { TimeBlock } from '../@types/TimeBlock';

import useSetTitle from '../hooks/setTitle';
import useFetch from '../hooks/useFetch';
import Heading from '../components/ui/Heading/Heading';
import PermissionBoxes from '../components/customize/Selectors/PermissionBoxes';
import TimeBlockingSelector from '../components/customize/Selectors/TimeBlockingSelector';
import LoadingScreen from '../components/ui/Loading/LoadingScreen';
import LabelColorInput from '../components/customize/Inputs/LabelColorInput';

const CustomizePage = () => {
  const { t } = useTranslation(['general', 'customize']);
  useSetTitle(t('calendar:calendar-customize.title'));
  const params = useParams();
  const calendarId = params.id;
  const [calendar, setCalendar] = useState<Calendar | null>(null);

  const { fetchData: getCurrentCalendar, loading: isLoading } = useFetch(
    'GET',
    [`calendars/${calendarId}`]
  );

  // TODO: Add translations
  useEffect(() => {
    const getCalendar = async () => {
      try {
        const response = await getCurrentCalendar();
        if (response.ok) {
          const data = await response.json();
          setCalendar(data);
        } else {
          console.error('Error fetching calendar');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCalendar();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`d-flex flex-column gap-large`}>
      <Row>
        <Heading level={1} className="heading--lg clr-primary" />
      </Row>

      {calendar && <LabelColorInput calendar={calendar} />}

      <TimeBlockingSelector calendar={calendar!} />

      <PermissionBoxes />
    </div>
  );
};

export default CustomizePage;
