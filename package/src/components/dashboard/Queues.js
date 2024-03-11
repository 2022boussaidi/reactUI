import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button ,Col,Row} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faExclamationCircle, faTimesCircle, faRedo, faPlay, faStop, faRefresh, faEyeDropper, faEye, faSpinner, faPlayCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';

export default function Overview() {
  const [queues, setQueues] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [resetQueueId, setResetQueueId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    siteName: "",
    robotName: "",
    status: "",
    interactive: ""
  });
  const [runningCount, setRunningCount] = useState(0);
  const [stoppedCount, setStoppedCount] = useState(0);
  const [interactiveCount, setInteractiveCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    loadQueues();
  }, []);

  useEffect(() => {
    // Update counts whenever queues change
    updateCounts();
  }, [queues]);

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

  const updateCounts = () => {
    // Calculate counts of running, stopped, and interactive queues
    const running = queues.filter(queue => queue.status === "running").length;
    const stopped = queues.filter(queue => queue.status === "stopped").length;
    const interactive = queues.filter(queue => queue.interactive).length;
    
    // Update state variables with the counts
    setRunningCount(running);
    setStoppedCount(stopped);
    setInteractiveCount(interactive);
  };

  const handleResetConfirmation = (queueId) => {
    setResetQueueId(queueId);
    setModalOpen(true);
  };

  const handleReset = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/queue/reset/${resetQueueId}`,
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
      console.error("Error resetting queue:", error);
    }
  };

  const handleStart = async (queueId) => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/queue/start/${queueId}`,
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
      console.error("Error starting queue:", error);
    }
  };

  const handleStop = async (queueId) => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/queue/stop/${queueId}`,
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
      console.error("Error stopping queue:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredQueues = queues.filter(queue => {
    return (
      //(queue.siteName?.toLowerCase().includes(filter.siteName.toLowerCase()) || filter.siteName === "") &&
      (queue.robot?.name?.toLowerCase().includes(filter.robotName.toLowerCase()) || filter.robotName === "") //&&
      //(String(queue.status)?.includes(filter.status) || filter.status === "") &&
     // (String(queue.interactive)?.includes(filter.interactive) || filter.interactive === "")
    );
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredQueues.length / pageSize);

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
            <div className="form-row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by robot name"
                  name="robotName"
                  value={filter.robotName}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <Row className="form-row mb-3 ">
            
        
            <Col sm="4" lg="31">
         <FontAwesomeIcon icon={faPlayCircle} size="2x" className="  mr-1 text-success col-1"  /> Running: {runningCount}
         </Col>
      
         <Col sm="4" lg="31">
         <FontAwesomeIcon icon={faStopCircle}size="2x" className="mr-1 text-danger col-1"/> Stopped: {stoppedCount}
         </Col>
         <Col sm="4" lg="31">
         <FontAwesomeIcon icon={faExclamationCircle} size="2x" className="mr-1 text-warning col-1" /> Interactive: {interactiveCount}
         </Col>
       
     </Row>
     
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Site name</th>
                  <th scope="col">Robot name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Interactive</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueues.slice(offset, offset + pageSize).map((queue, index) => (
                  <tr key={queue.queueId}>
                    <td>{queue.siteName}</td>
                    <td>{queue.robot.name}</td>
                    <td>
                      {queue.status ? (
                        <FontAwesomeIcon icon={faClock} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />
                      )}
                    </td>
                    <td>
                      {queue.interactive ? (
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                      ) : (
                        <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                      )}
                    </td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewqueue/${queue.queueId}`}>
                        <FontAwesomeIcon icon={faEye} /> Details
                      </Link>
                      <Link className="btn btn-secondry mx-2"onClick={() => handleResetConfirmation(queue.queueId)} >
                        <FontAwesomeIcon icon={faRedo} /> 
                      </Link>
                      <Link className="btn btn-secondry mx-2" onClick={() => handleStart(queue.queueId)}>
                        <FontAwesomeIcon icon={faPlay} /> 
                      </Link>
                      <Link className="btn btn-secondry mx-2" onClick={() => handleStop(queue.queueId)}>
                        <FontAwesomeIcon icon={faStop} /> 
                      </Link>
                      <Link className="btn btn-secondry mx-2" onClick={() => handleReset(queue.queueId)}>
                        <FontAwesomeIcon icon={faRefresh} /> 
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
            />
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Confirmation</ModalHeader>
        <ModalBody>Are you sure you want to reset this queue?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleReset}>Yes</Button>{' '}
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(!successModalOpen)}>
        <ModalHeader toggle={() => setSuccessModalOpen(!successModalOpen)}>Success</ModalHeader>
        <ModalBody>Queue reset successfully!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModalOpen(!successModalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
