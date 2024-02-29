import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignRight, faInfo, faPlay, faReceipt, faRecycle, faRedo, faRefresh, faRegistered, faRightLeft, faRobot, faSpinner, faSpoon, faSprayCan, faStar, faStop, faToggleOff, faToggleOn, faTriangleCircleSquare, faTriangleExclamation, faUndo } from "@fortawesome/free-solid-svg-icons";

export default function Overview() {
  const [queues, setQueues] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [startQueueId, setStartQueueId] = useState(null);
  const [stopQueueId, setStopQueueId] = useState(null);
  const [resetQueueId, setResetQueueId] = useState(null);
  const [reserveQueueId, setReserveQueueId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    loadQueues();
  }, []);

  const loadQueues = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callqueues",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setQueues(response.data.queues);
    } catch (error) {
      console.error("Error loading queues:", error);
    }
  };
    const handleResetConfirmation = (queueId) => {
      setResetQueueId(queueId);
      setModalOpen(true);
    };
    const handleStart = async () => {
      try {
        const bearerToken = localStorage.getItem('token');
        await axios.post(
          `http://localhost:8080/queue/start/${startQueueId}`,
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
        console.error("Error starting  queue:", error);
      }
    };
    const handleStop = async () => {
        try {
          const bearerToken = localStorage.getItem('token');
          await axios.post(
            `http://localhost:8080/queue/start/${stopQueueId}`,
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
          console.error("Error stoping  queue:", error);
        }
      };
    
      const handleReset = async () => {
        try {
          const bearerToken = localStorage.getItem('token');
          await axios.post(
            `http://localhost:8080/queue/reset/${stopQueueId}`,
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
          console.error("Error reseting  queue:", error);
        }
      };
      const handleReserve = async () => {
        try {
          const bearerToken = localStorage.getItem('token');
          await axios.post(
            `http://localhost:8080/queue/reserve/${stopQueueId}`,
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
          console.error("Error reserving  queue:", error);
        }
      };
 

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Queues Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the queues 
          </CardSubtitle>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                
                  <th scope="col">Site Id</th>
                  <th scope="col">Site name</th>
                
                </tr>
              </thead>
              <tbody>
                {queues.map((queue, index) => (
                  <tr key={queue.queueId}>
                    
                    <td>{queue.siteId}</td>
                    <td>{queue.siteName}</td>
                   
                   
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewrobot/${queue.queueId}`}>
                        Details
                      </Link>
                      <Link className="btn btn-secondry mx-2"onClick={() => handleResetConfirmation(queue.queueId)} >
                        <FontAwesomeIcon icon={faRedo} /> 
                      </Link>
                      <button className="btn btn-secondry mx-2"onClick={() => handleResetConfirmation(queue.queueId)} >
                        <FontAwesomeIcon icon={faPlay} /> 
                      </button>
                      <button className="btn btn-secondry mx-2"onClick={() => handleResetConfirmation(queue.queueId)} >
                        <FontAwesomeIcon icon={faStop} /> 
                      </button>
                      <button className="btn btn-secondry mx-2"onClick={() => handleResetConfirmation(queue.queueId)} >
                        <FontAwesomeIcon icon={faRefresh} /> 
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
          <Button color="danger" onClick={handleReset}>Yes</Button>{' '}
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
