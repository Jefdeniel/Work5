import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { GoogleEvent } from '../../@types/Events';
import EventCard from '../../components/ui/EventCard/EventCard';

const GoogleCalendar = () => {
  const [googleEvents, setGoogleEvents] = useState<GoogleEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const calendarID = import.meta.env.VITE_CALENDAR_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const getEvents = (calendarID: string, apiKey: string) => {
    setLoading(true);
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let googleEvents: GoogleEvent[] = response.result.items || [];
            setGoogleEvents(googleEvents);
          },
          (error) => {
            console.error('Error fetching events:', error);
            setGoogleEvents([]);
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }
    gapi.load('client', initiate);
  };

  useEffect(() => {
    if (calendarID && apiKey) {
      getEvents(calendarID, apiKey);
    }
  }, [calendarID, apiKey]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <ul>
        {googleEvents.map((event) => (
          <EventCard
            key={event.id}
            isGoogleEvent={true}
            event={{
              title: event.summary || '',
              start_time: new Date(
                event.start?.dateTime || event.start?.date || 'No start date'
              ),
              end_time: new Date(
                event.end?.dateTime || event.end?.date || 'No end date'
              ),
              location: event.location || '',
              status: event.status || '',
              htmlLink: event.htmlLink || '',
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default GoogleCalendar;
