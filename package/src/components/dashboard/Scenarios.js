import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';

export default function Scenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState({
    zoneName: "",
    scriptName: "",
    applicationName: ""
  });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Number of items per page

  // Define a state variable to store unique zone, script, app names
  const [zoneNames, setZoneNames] = useState([]);
  const [scriptNames, setScriptNames] = useState([]);
  const [applicationNames, setApplicationNames] = useState([]);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/scenarios",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setScenarios(response.data);
    } catch (error) {
      console.error("Error loading scenarios:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const filteredScenarios = scenarios.filter(scenario => {
    return (
      (scenario.zoneName?.toLowerCase().includes(filter.zoneName.toLowerCase()) || filter.zoneName === "") &&
      (String(scenario.scriptName)?.includes(filter.scriptName.toLowerCase()) || filter.scriptName === "") &&
      (String(scenario.applicationName)?.includes(filter.applicationName.toLowerCase()) || filter.applicationName === "") 
    );
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredScenarios.length / pageSize);

  // useEffect to extract and set unique zone, script, and app names
  useEffect(() => {
    const zones = scenarios.map(scenario => scenario.zoneName).filter(Boolean);
    const uniqueZoneNames = [...new Set(zones)];
    setZoneNames(uniqueZoneNames);

    const scripts = scenarios.map(scenario => scenario.scriptName).filter(Boolean);
    const uniqueScriptNames = [...new Set(scripts)];
    setScriptNames(uniqueScriptNames);

    const applications = scenarios.map(scenario => scenario.applicationName).filter(Boolean);
    const uniqueApplicationNames = [...new Set(applications)];
    setApplicationNames(uniqueApplicationNames);
  }, [scenarios]);

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Scenarios Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the scenarios
          </CardSubtitle>
          <div className="py-4">
            <Row className="form-row mb-3 ">
              <div className="col">
                <select
                  className="form-control"
                  name="zoneName"
                  value={filter.zoneName}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by zone name</option>
                  {zoneNames.map((zoneName, index) => (
                    <option key={index} value={zoneName}>{zoneName}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="scriptName"
                  value={filter.scriptName}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by script name</option>
                  {scriptNames.map((scriptName, index) => (
                    <option key={index} value={scriptName}>{scriptName}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-control"
                  name="applicationName"
                  value={filter.applicationName}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by application</option>
                  {applicationNames.map((applicationName, index) => (
                    <option key={index} value={applicationName}>{applicationName}</option>
                  ))}
                </select>
              </div>
            </Row>
            
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">NAME</th>
                  <th scope="col">ZONE NAME</th>
                  <th scope="col">ACTIVE</th>
                  <th scope="col">START DATE</th>
                  <th scope="col">END DATE</th>
                </tr>
              </thead>
              <tbody>
                {filteredScenarios.slice(offset, offset + pageSize).map((scenario, index) => (
                  <tr key={scenario.id}>
                    <td>{scenario.name}</td>
                    <td>{scenario.zoneName}</td>
                    <td>
                      {scenario.active === 0 ? (
                        <FontAwesomeIcon icon={faClock} className="text-danger" />
                      ) : (
                        <FontAwesomeIcon icon={faClock} className="text-success" />
                      )}
                    </td>
                    <td>{scenario.startDate}</td>
                    <td>{scenario.endDate}</td>
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
    </div>
  );
}
