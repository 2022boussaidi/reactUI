import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const { id } = useParams();

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

  return (
    <div className="container">
        <h2>
        Events Listing
        </h2>
        <p>Current Date: {currentDate}</p>
      <Card>
        <CardBody>
        
          <CardSubtitle className="mb-4 text-muted">
            Overview of all events
          </CardSubtitle>
          <Link className="btn btn-outline-primary mb-3" to="/addevent">
            Add Event
          </Link>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.start}</td>
                  <td>{event.end}</td>
                  <td>
                   
                    <Link
                      className="btn btn-sm btn-info"
                      to={`/editevent/${event.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
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
  );
}
