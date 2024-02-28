import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

export default function Overview() {
  const [robots, setRobots] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadRobots();
  }, []);

  const loadRobots = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callrobots",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setRobots(response.data.robots);
    } catch (error) {
      console.error("Error loading robots:", error);
    }
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Robots Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the robots
          </CardSubtitle>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Heart Beat</th>
                  <th scope="col">HB Max</th>
                  <th scope="col">HB Status</th>
                </tr>
              </thead>
              <tbody>
                {robots.map((robot, index) => (
                  <tr key={robot.robotId}>
                    <td>{robot.name}</td>
                    <td>{robot.heartBeat}</td>
                    <td>{robot.hbmax}</td>
                    <td>{robot.hbStatus}</td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewuser/${robot.robotId}`}>
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
