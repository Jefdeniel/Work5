import { useState } from 'react';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { CalendarEvent } from '../../../@types/CalendarEvents';

import './Calendar.scss';
import BaseCalendar from './BaseCalendar';

const BigCalendar = () => {
  //TODO: Make event detail component to edit event and show that like < EventForm at example at bottom of page />
  // Event is gonna be used to show the event view of the clicked event (example bottom of the page)
  const [event, setEvent] = useState<CalendarEvent>();

  return (
    <div className="full-calendar">
      <BaseCalendar
        onShowEventView={(event) => {
          setEvent(event);
        }}
      />
    </div>
  );
};

export default BigCalendar;

// Example https://github.com/usmanabdurrehman/react-big-calendar-tutorial/blob/EventCrud/src/Components/CalendarView/CalendarView.tsx:
/*
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import { Appointment } from "../../types";
import EventForm from "../EventForm/EventForm";

export default function CalendarView() {
  const [appointment, setAppointment] = useState<Appointment>();

  return (
    <Flex gap={10} m={4} height="100%">
      <Flex grow={1} flexBasis={"50%"} overflow="auto">
        <Calendar
          onShowAppointmentView={(appointment) => setAppointment(appointment)}
        />
      </Flex>
      <Flex grow={1} flexBasis={"50%"}>
        {appointment && <EventForm appointment={appointment} />}
      </Flex>
    </Flex>
  );
}
*/
