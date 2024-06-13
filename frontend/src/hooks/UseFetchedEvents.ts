import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DateTime } from 'ts-luxon';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { Event } from '../@types/Events';

const useFetchedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const params = useParams();
  const { fetchData: getEvents } = useFetch('GET', [
    'events',
    'calendar',
    params.id?.toString() ?? '',
  ]);
  const { fetchData: addEventAPI } = useFetch('POST', ['events']);
  const { t } = useTranslation(['calendar']);

  useEffect(() => {
    getEvents()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch events');
        }
      })
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          ...event,
          start: DateTime.fromISO(event.start_time).toJSDate(),
          end: DateTime.fromISO(event.end_time).toJSDate(),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(t('calendar:error.fetchingEvents'), ': ', error);
        toast.error(t('calendar:error.fetchingEvents'));
      });
  }, []);

  const addEvent = async (newEvent: Event) => {
    try {
      const response = await addEventAPI({}, newEvent);

      if (response.ok) {
        const data = await response.json();
        const formattedEvent = {
          ...data,
          start: DateTime.fromISO(data.start_time).toJSDate(),
          end: DateTime.fromISO(data.end_time).toJSDate(),
        };
        setEvents((prevEvents) => [...prevEvents, formattedEvent]);
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error('Failed to add event');
      }
    } catch (error) {
      console.error(t('calendar:error.addingEvent'), ': ', error);
      toast.error(t('calendar:error.addingEvent') + ': ' + error.message);
    }
  };

  return { events, addEvent };
};

export default useFetchedEvents;
