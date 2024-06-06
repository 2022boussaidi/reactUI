import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Pagination, PaginationItem, PaginationLink, Card, CardBody, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(6);
  const [modal, setModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/logs');
        const hits = response.data.hits.hits;

        const processedLogs = hits.map(hit => ({
          timestamp: hit.fields["@timestamp"][0],
          message: hit.fields.Messages[0],
          agent_hostname: hit.fields["agent.name"][0],
          role: hit.fields["fields.role"][0],
          site: hit.fields["fields.site"][0],
          input_type: hit.fields["input.type"][0],
          fields_env: hit.fields["fields.env"][0],
          loglevel: hit.fields["loglevel"][0],
          additional_details: hit.fields // store all fields for modal display
        }));

        setLogs(processedLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  // Get current logs
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(logs.length / logsPerPage);

  // Toggle modal
  const toggleModal = (log = null) => {
    setSelectedLog(log);
    setModal(!modal);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h4>Log Entries</h4>
          <Table striped>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Message</th>
                <th>Agent Hostname</th>
                <th>Role</th>
                <th>Site</th>
                <th>Input Type</th>
                <th>Fields Env</th>
                <th>Log Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.message}</td>
                  <td>{log.agent_hostname}</td>
                  <td>{log.role}</td>
                  <td>{log.site}</td>
                  <td>{log.input_type}</td>
                  <td>{log.fields_env}</td>
                  <td>{log.loglevel}</td>
                  <td>
                    <Button className="outline-primary" size="sm" onClick={() => toggleModal(log)}>
                      See More Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <PaginationItem disabled={currentPage <= 1}>
              <PaginationLink
                first
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(1);
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={currentPage <= 1}>
              <PaginationLink
                previous
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(currentPage - 1);
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={currentPage >= totalPages}>
              <PaginationLink
                next
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(currentPage + 1);
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={currentPage >= totalPages}>
              <PaginationLink
                last
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(totalPages);
                }}
              />
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>

     
      <Modal isOpen={modal} toggle={toggleModal} size="m">
       
        <ModalHeader toggle={toggleModal}>Log Details</ModalHeader>
        <Card>
             <CardBody>
        <ModalBody>
       
          {selectedLog && selectedLog.additional_details && (
            
            <Table striped>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedLog.additional_details).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{Array.isArray(value) ? value.join(', ') : value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
           
          )}
         
        </ModalBody>
        </CardBody>
              </Card>
       
      </Modal>
     
    </div>
  );
};

export default Logs;
