import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock, faExclamationCircle, faInfo, faSpinner, faTimesCircle, faUndo } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';

export default function Overview() {
  const [robots, setRobots] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [rebootRobotId, setRebootRobotId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    hbStatus: "",
    storageName: "",
    isPrivate: ""
  });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Number of items per page

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredRobots = robots.filter(robot => {
    return (
      robot.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      String(robot.storageName).includes(filter.storageName) &&
      String(robot.hbStatus).includes(filter.hbStatus) &&
      String(robot.isPrivate).includes(filter.isPrivate)
    );
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredRobots.length / pageSize);

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
            <div className="form-row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by name"
                  name="name"
                  value={filter.name}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">HBstatus</th>
                  <th scope="col">Storgae name</th>
                  <th scope="col">need update</th>
                  <th scope="col">Privacy</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRobots.slice(offset, offset + pageSize).map((robot, index) => (
                  <tr key={robot.robotId}>
                    <td>{robot.name}</td>
                    <td>
                      {robot.hbStatus ? (
                        <FontAwesomeIcon icon={faClock} />
                      ) : (
                        <FontAwesomeIcon icon={faExclamationCircle} />
                      )}
                    </td>
                    <td>{robot.storageName ? robot.storageName : <FontAwesomeIcon icon={faExclamationCircle}  className="text-warning"/>}</td>
                    <td>
                      {robot.needUpdate ? (
                        <FontAwesomeIcon icon={faCheckCircle}className="text-success"  />
                      ) : (
                        <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                      )}
                    </td>
                    <td>{robot.isPrivate ? <span className="badge bg-primary">Private</span> : <span className="badge bg-secondary">Public</span>}</td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewrobot/${robot.robotId}`}>
                        Details
                      </Link>
                      <button className="btn btn-gray mx-2" onClick={() => handleRebootConfirmation(robot.robotId)} >
                        <FontAwesomeIcon icon={faSpinner} /> Reboot
                      </button>
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
