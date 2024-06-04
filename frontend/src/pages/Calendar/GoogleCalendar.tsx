import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import EventCard from '../../components/ui/EventCard/EventCard';

const GoogleCalendar = () => {
  const [googleEvents, setGoogleEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const calendarID = import.meta.env.VITE_CALENDAR_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const getEvents = (calendarID, apiKey) => {
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
            let googleEvents = response.result.items;

            setGoogleEvents(googleEvents);
          },
          function (err) {
            console.error('Error fetching events:', err);
            setGoogleEvents([]); // Don't remove: clears events in case of error
          }
        );
    }
    gapi.load('client', initiate);
    setLoading(false);
  };

  useEffect(() => {
    getEvents(calendarID, apiKey);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  // console.log('events', googleEvents[0]?.start?.date);

  return (
    <div>
      <ul>
        {googleEvents?.map((event) => (
          <EventCard
            key={event.id}
            isGoogleEvent={true}
            event={{
              title: event.summary || '',
              start: new Date(googleEvents[0]?.start?.date) || 'No start date',
              end: new Date(googleEvents[0]?.end?.date) || 'No end date',

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
