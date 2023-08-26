import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { Col, Row } from "reactstrap";
import TopCards from "../../views/ui/TopCards";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/projects");
    setProjects(result.data);
  };

  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:8080/projects/${id}`);
    loadProjects();
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Projects Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the projects
          </CardSubtitle>
          <div className="py-4">
            {/* Display the total number of projects */}
            <p>Total Projects: {projects.length}</p>

            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Project name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.startDate}</td>
                    <td>{project.endDate}</td>
                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewproject/${project.id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/editproject/${project.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className="btn btn-outline-primary mx-2" to="/addproject">
            Add Project
          </Link>
        </CardBody>
      </Card>
      
    </div>
    
  );
}
