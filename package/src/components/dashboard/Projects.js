import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [showAll, setShowAll] = useState(false); // Indicates if all projects should be shown

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

  // Set the number of initially visible projects
  useEffect(() => {
    if (projects.length > 0) {
      setVisibleProjects(projects.slice(0, 2)); // Change 5 to the desired number
    }
  }, [projects]);

  // Toggle between showing all projects or limited projects
  const handleSeeMore = () => {
    if (showAll) {
      setVisibleProjects(projects.slice(0, 2)); // Change 5 to the desired number
    } else {
      setVisibleProjects(projects);
    }
    setShowAll(!showAll);
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Projects Listing</CardTitle>
            <button
              className="btn btn-outline-primary"
              onClick={handleSeeMore}
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the projects
          </CardSubtitle>
          <div className="py-4">
            {/* Display the total number of projects */}
           

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
                {visibleProjects.map((project, index) => (
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
