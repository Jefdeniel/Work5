import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DateTime } from 'ts-luxon';
import useFetch from './useFetch';

export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const { fetchData: getEvents } = useFetch('GET', ['events']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        console.error('Error fetching events:', error);
        setError(error.message);
        toast.error('Error fetching events');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { events, loading, error };
};
