import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Calendar } from '../@types/Calendar';

import useSetTitle from '../hooks/setTitle';
import useFetch from '../hooks/useFetch';
import Heading from '../components/ui/Heading/Heading';
import LabelColorInput from '../components/customize/inputs/LabelColorInput';
import TimeBlockingInput from '../components/customize/inputs/TimeBlockingInput';
import PermissionBoxes from '../components/customize/inputs/PermissionBoxes';
import LoadingScreen from '../components/ui/Loading/LoadingScreen';

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

      <TimeBlockingInput />

      <PermissionBoxes />
    </div>
  );
};

export default CustomizePage;
