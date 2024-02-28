import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faRedo, faSpinner, faSpoon, faUndo } from "@fortawesome/free-solid-svg-icons";

export default function Overview() {
  const [robots, setRobots] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [rebootRobotId, setRebootRobotId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

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
    const handleRebootConfirmation = (robotId) => {
      setRebootRobotId(robotId);
      setModalOpen(true);
    };
    const handleReboot = async () => {
      try {
        const bearerToken = localStorage.getItem('token');
        await axios.post(
          `http://localhost:8080/reboot/${rebootRobotId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`
            }
          }
        );
        setSuccessModalOpen(true);
        setModalOpen(false);
      } catch (error) {
        console.error("Error rebooting robot:", error);
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
                      <Link className="btn btn-primary mx-2" to={`/viewrobot/${robot.robotId}`}>
                        Details
                      </Link>
                      <button className="btn btn-danger mx-2"onClick={() => handleRebootConfirmation(robot.robotId)} >
                        <FontAwesomeIcon icon={faSpinner} /> Reboot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Confirmation</ModalHeader>
        <ModalBody>Are you sure you want to reboot thid robot?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleReboot}>Yes</Button>{' '}
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(!successModalOpen)}>
        <ModalHeader toggle={() => setSuccessModalOpen(!successModalOpen)}>Success</ModalHeader>
        <ModalBody>Robot reboot successfully!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModalOpen(!successModalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
