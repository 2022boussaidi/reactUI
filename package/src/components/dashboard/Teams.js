import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import AdminLoginModal from "./AdminLoginModal"; // Import the admin

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [visibleTeams, setVisibleTeams] = useState([]);
  const [showAll, setShowAll] = useState(false); // Indicates if all teams should be shown
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Admin authentication state
  const [showAdminModal, setShowAdminModal] = useState(false); // Show/hide admin login modal
  const [teamIdToDelete, setTeamIdToDelete] = useState(null); // User ID to be deleted
  const [teamIdToEdit, setTeamIdToEdit] = useState(null); // User ID to be edited
  const { id } = useParams();

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await axios.get("http://localhost:8080/teams");
    setTeams(result.data);
  };

  const deleteTeam = async (id) => {
    await axios.delete(`http://localhost:8080/teams/${id}`);
    loadTeams();
  };

  // Set the number of initially visible teams
  useEffect(() => {
    if (teams.length > 0) {
      setVisibleTeams(teams.slice(0, 2)); // Change 5 to the desired number
    }
  }, [teams]);
 // Function to handle admin login
 const handleAdminLogin = async (adminEmail, adminPassword) => {
  try {
    const response = await axios.post("http://localhost:8080/admin/verify", {
      email: adminEmail,
      password: adminPassword,
    });

    if (response.data === "Admin verified") {
      setIsAdminAuthenticated(true);
      setShowAdminModal(false); // Close the modal on successful login

      // Check if there's a pending action (e.g., delete)
      if (teamIdToDelete !== null) {
        deleteTeam(teamIdToDelete);
        setTeamIdToDelete(null); // Reset the pending action
      }
    } else {
      // Handle authentication failure
      alert("Admin login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error verifying admin credentials:", error);
  }
};
  // Toggle between showing all teams or limited teams
  const handleSeeMore = () => {
    if (showAll) {
      setVisibleTeams(teams.slice(0, 2)); // Change 5 to the desired number
    } else {
      setVisibleTeams(teams);
    }
    setShowAll(!showAll);
  };
 // Function to open the admin login modal before performing an action
 const handleActionWithAdminVerification = (action, id) => {
  // Store the user ID for the pending action
  setTeamIdToDelete(id);

  // Open the admin login modal
  setShowAdminModal(true);
};
const handleEditWithAdminVerification = (id) => {
  // Store the user ID for the pending edit action
  setTeamIdToEdit(id);

  // Open the admin login modal
  setShowAdminModal(true);
};
const handleAddWithAdminVerification = () => {
  // Store the user ID for the pending edit action
  

  // Open the admin login modal
  setShowAdminModal(true);
};

  return (
    <div className="container">
      <Card>
        <CardBody>
        <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Teams Listing</CardTitle>
            <button
              className="btn btn-outline-primary"
              onClick={handleSeeMore}
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the teams
          </CardSubtitle>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Project name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleTeams.map((team, index) => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.project.name}</td> {/* Assuming project field has a 'name' property */}
                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewteam/${team.id}`}
                      >
                        View
                      </Link>
                      {isAdminAuthenticated ? (
                        <Link className="btn btn-outline-primary mx-2" to={`/editteam/${team.id}`}>
                                      Edit
                          </Link>
                         ) : (
                        <button className="btn btn-outline-primary mx-2" onClick={() => handleEditWithAdminVerification(team.id)}>
                             Edit
                         </button>
                        )}
                      {isAdminAuthenticated ? (
                        
                          <button className="btn btn-danger mx-2" onClick={() => deleteTeam(team.id)}>
                            Delete
                          </button>
                      
                      ) : (
                        <button className="btn btn-danger mx-2" onClick={() => handleActionWithAdminVerification("delete", team.id)}>
                          Delete
                        </button>
                        
                      )
                      
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
          </div>
          {isAdminAuthenticated ? (
            <Link className="btn btn-outline-primary mx-2" to="/addteam">
              Add Team
            </Link>
          ) : (
            <button className="btn btn-outline-primary mx-2" onClick={() => handleAddWithAdminVerification("add")}>
              Add Team
            </button>
          )}
        </CardBody>
      </Card>
     {/* Admin Login Modal */}
     <AdminLoginModal show={showAdminModal} onHide={() => setShowAdminModal(false)} onLogin={handleAdminLogin} />
    </div>
  );
}
