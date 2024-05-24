import { useEffect, useState } from 'react';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import { toast } from 'react-toastify';
import moment from 'moment';
import { DateTime } from 'ts-luxon';

import useFetchedEvents from '../../../hooks/useFetchedEvents';
import LoadingScreen from '../../ui/Loading/LoadingScreen';

import './Calendar.scss';

const localizer = momentLocalizer(moment);

const BaseCalendar = (props: CalendarProps) => {
  const { events, loading, error } = useFetchedEvents();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div className="full-calendar">
      <Calendar
        {...props}
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['day', 'week', 'month']}
        timeslots={2}
      />
    </div>
  );
};

export default BaseCalendar;
