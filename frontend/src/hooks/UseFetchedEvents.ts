import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DateTime } from 'ts-luxon';

import { Event } from '../@types/Events';
import { TimeBlock } from '../@types/TimeBlock';

import useFetch from './useFetch';

const useFetchedEvents = () => {
  // State
  const [events, setEvents] = useState<Event[]>([]);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);

  const params = useParams();

  // Fetch
  const { fetchData: getEvents } = useFetch('GET', [
    'events',
    'calendar',
    params.id?.toString() ?? '',
  ]);
  const { fetchData: getTimeBlocks } = useFetch('GET', [
    'timeblocks',
    'calendar',
    params.id?.toString() ?? '',
  ]);
  const { fetchData: addEventAPI } = useFetch('POST', ['events']);
  const { t } = useTranslation(['calendar', 'timeblocks']);

  useEffect(() => {
    getEvents()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(t('events:toasts.fetchingEvents'));
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
        console.error(t('events:toasts.fetchingEvents'), ': ', error);
        toast.error(t('events:error.fetchingEvents'));
      });

    getTimeBlocks()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(t('timeblocks:error.fetchingTimeBlocks'));
        }
      })
      .then((data) => {
        const formattedTimeBlocks = data.map((timeBlock) => ({
          ...timeBlock,
          start: DateTime.fromISO(timeBlock.start_time).toJSDate(),
          end: DateTime.fromISO(timeBlock.end_time).toJSDate(),
          type: 'timeBlocker',
        }));
        setTimeBlocks(formattedTimeBlocks);
      })
      .catch((error) => {
        console.error(t('timeblocks:error.fetchingTimeBlocks'), ': ', error);
        toast.error(t('timeblocks:error.fetchingTimeBlocks'));
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

  return { events, timeBlocks, addEvent };
};

export default useFetchedEvents;
