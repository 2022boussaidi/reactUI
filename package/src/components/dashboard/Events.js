import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Col,
  Row,
} from "reactstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";

const localizer = momentLocalizer(moment);

export default function Events() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: selectedStartDate,
    end: selectedEndDate,
  });
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [showAll, setShowAll] = useState(false); // Indicates if all users should be shown

  useEffect(() => {
    loadEvents();
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const loadEvents = async () => {
    const result = await axios.get("http://localhost:8080/events");
    setEvents(result.data);
  };

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:8080/events/${id}`);
    loadEvents();
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setNewEvent({
      ...newEvent,
      start: date,
    });
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setNewEvent({
      ...newEvent,
      end: date,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8080/events", newEvent);
    loadEvents();
    setNewEvent({
      title: "",
      start: selectedStartDate,
      end: selectedEndDate,
    });
  };
   // Set the number of initially visible users
   useEffect(() => {
    if (events.length > 0) {
      setVisibleEvents(events.slice(0, 2)); // Change 5 to the desired number
    }
  }, [events]);

  // Toggle between showing all users or limited users
  const handleSeeMore = () => {
    if (showAll) {
      setVisibleEvents(events.slice(0, 2)); // Change 5 to the desired number
    } else {
      setVisibleEvents(events);
    }
    setShowAll(!showAll);
  };

  return (
    <div className="container">
      <h2>Calendar</h2>
      <Row>
        <Col xs="12" md="6">
        <Card>
              <CardBody>
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 ,width:500}}
            />
          </div>
          </CardBody>
            </Card>
        </Col>
        <Col sm="6" lg="31">
          <div className="event-list">
            <Card>
              <CardBody>
                <CardSubtitle className="mb-4 text-muted">
                  Add an event
                </CardSubtitle>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="title">Event Title</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="start">Start Date</Label>
                    <br />
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={handleStartDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="end">End Date</Label>
                    <br />
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={handleEndDateChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary">Add Event</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
              <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Events Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={handleSeeMore}>
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
                <CardSubtitle className="mb-4 text-muted">
                  Overview of all events
                </CardSubtitle>
                <Table>
                  <thead>
                    <tr>
                      <th>Event Title</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleEvents.map((event, index) => (
                      <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{event.start}</td>
                        <td>{event.end}</td>
                        <td>
                          <Link
                            className="btn btn-outline-primary mx-2"
                            to={`/editevent/${event.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => deleteEvent(event.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
