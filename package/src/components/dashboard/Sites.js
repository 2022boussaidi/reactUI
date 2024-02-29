import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faUndo } from "@fortawesome/free-solid-svg-icons";

export default function Sites() {
  const [sites, setSites] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [resetSiteId, setResetSiteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callsites",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setSites(response.data.sites);
    } catch (error) {
      console.error("Error loading sites:", error);
    }
  };

  const handleResetConfirmation = (siteId) => {
    setResetSiteId(siteId);
    setModalOpen(true);
  };

  const handleReset = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:8080/site/${resetSiteId}/resetQueues`,
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
      console.error("Error resetting queues:", error);
    }
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Sites Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the sites
          </CardSubtitle>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Scenario Count</th>
                  <th scope="col">Zone Count</th>
                  <th scope="col">Queue Count</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site, index) => (
                  <tr key={site.siteId}>
                    <td>{site.name}</td>
                    <td>{site.scenarioNb}</td>
                    <td>{site.zoneNb}</td>
                    <td>{site.queueNb}</td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewsite/${site.siteId}`}>
                        <FontAwesomeIcon icon={faInfo} /> Details
                      </Link>
                      <button className="btn btn-gray mx-2" onClick={() => handleResetConfirmation(site.siteId)}>
                        <FontAwesomeIcon icon={faUndo} /> Reset
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
        <ModalBody>Are you sure you want to reset the queues for this site?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleReset}>Yes</Button>{' '}
          <Button color="secondary" onClick={() => setModalOpen(!modalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={successModalOpen} toggle={() => setSuccessModalOpen(!successModalOpen)}>
        <ModalHeader toggle={() => setSuccessModalOpen(!successModalOpen)}>Success</ModalHeader>
        <ModalBody>Queues reset successfully!</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSuccessModalOpen(!successModalOpen)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
