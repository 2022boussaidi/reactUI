import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment-timezone';
import { Card, CardBody } from 'reactstrap';
const localizer = momentLocalizer(moment);
const events = [
    {
      title: 'Event 1',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate()
    },
    {
      title: 'Event 2',
      start: moment().add(1, 'day').toDate(),
      end: moment().add(1, 'day').add(2, 'hours').toDate()
    },
    // Add more events as needed
  ];
  const CalendarComponent = () => {
    return (
      <Card>
        <CardBody>
      <div>
        <h5>Calendar</h5>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
      </CardBody>
      </Card>
 
 );
  };
  export default CalendarComponent;
    