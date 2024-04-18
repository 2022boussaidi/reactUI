import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faClock, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";


export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    
  });
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10; // Number of items per page

  // Define a state variable to store unique zone, script, app names
  const [workNames, setWorkNames] = useState([]);
  
  const [dropdownOpen, setDropdownOpen] = useState({}); // State for managing dropdowns per row

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(
        "http://localhost:8080/workspaces",
        
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error loading workspaces:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const filteredWorkspaces = workspaces.filter(workspace => {
    return (
      (workspace.name?.toLowerCase().includes(filter.name.toLowerCase()) || filter.name === "") 
    );
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(filteredWorkspaces.length / pageSize);

  // useEffect to extract and set unique zone, script, and app names
  useEffect(() => {
    const workNamesArray = workspaces.map(workspace => workspace.name).filter(Boolean);
    const uniqueWorkNames = [...new Set(workNamesArray)];
    setWorkNames(uniqueWorkNames);

    
  }, [workspaces]);

  const toggleDropdown = (index) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [index]: !prevState[index] // Toggle the dropdown state for the specific row index
    }));
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Workspaces
          </CardTitle>
            <button className="btn btn-outline-primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the workspaces
          </CardSubtitle>
          <div className="py-4">
            <Row className="form-row mb-3 ">
              <div className="col">
                <select
                  className="form-control"
                  name="zoneName"
                  value={filter.name}
                  onChange={handleFilterChange}
                >
                  <option value="">Filter by zone name</option>
                  {workNames.map((workName, index) => (
                    <option key={index} value={workName}>{workName}</option>
                  ))}
                </select>
              </div>
              
              
            </Row>
            
            <table className="table border shadow">
              <thead>
                <tr>
                  
                  <th scope="col">Workspace name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Associated applications</th>
                 
                  <th scope="col">Actions</th>

                 
                  
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkspaces.slice(offset, offset + pageSize).map((workspace, index) => (
                  <tr key={workspace.id}>
                    <td>{workspace.name}</td>
                    <td>{workspace.description}</td>
                    <td>
      {workspace.applications.map(workspace => (
        <div key={workspace.id}>{workspace.name}</div>
      ))}
    </td>
    
                   
                    
                    <td>
                      <Dropdown isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)}>
                        <DropdownToggle color="white">
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem header>Actions</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>Sites</DropdownItem>
                          <DropdownItem>Efficiency</DropdownItem>
                          <DropdownItem>see more</DropdownItem>
                          
                        </DropdownMenu>
                      </Dropdown>
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
    </div>
  );
}
