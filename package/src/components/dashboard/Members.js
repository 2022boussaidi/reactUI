import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import AdminLoginModal from "./AdminLoginModal"; // Import the admin login modal component

export default function Home() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [showAll, setShowAll] = useState(false); // Indicates if all users should be shown
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Admin authentication state
  const [showAdminModal, setShowAdminModal] = useState(false); // Show/hide admin login modal
  const [userIdToDelete, setUserIdToDelete] = useState(null); // User ID to be deleted
  const [userIdToEdit, setUserIdToEdit] = useState(null); // User ID to be edited
  



  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    loadUsers();
  };

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
        if (userIdToDelete !== null) {
          deleteUser(userIdToDelete);
          setUserIdToDelete(null); // Reset the pending action
        }
      } else {
        // Handle authentication failure
        alert("Admin login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error verifying admin credentials:", error);
    }
  };

  // Set the number of initially visible users
  useEffect(() => {
    if (users.length > 0) {
      setVisibleUsers(users.slice(0, 2)); // Change 5 to the desired number
    }
  }, [users]);

  // Toggle between showing all users or limited users
  const handleSeeMore = () => {
    if (showAll) {
      setVisibleUsers(users.slice(0, 2)); // Change 5 to the desired number
    } else {
      setVisibleUsers(users);
    }
    setShowAll(!showAll);
  };

  // Function to open the admin login modal before performing an action
  const handleActionWithAdminVerification = (action, id) => {
    // Store the user ID for the pending action
    setUserIdToDelete(id);

    // Open the admin login modal
    setShowAdminModal(true);
  };
  const handleEditWithAdminVerification = (id) => {
    // Store the user ID for the pending edit action
    setUserIdToEdit(id);
  
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
            <CardTitle tag="h5">Members Listing</CardTitle>
            <button className="btn btn-outline-primary" onClick={handleSeeMore}>
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of the members
          </CardSubtitle>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Access Level</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.accessLevel}</td>
                    <td>
                      <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>
                        View
                      </Link>
                      {isAdminAuthenticated ? (
                        <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>
                                      Edit
                          </Link>
                         ) : (
                        <button className="btn btn-outline-primary mx-2" onClick={() => handleEditWithAdminVerification(user.id)}>
                             Edit
                         </button>
                        )}
                      {isAdminAuthenticated ? (
                        
                          <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                            Delete
                          </button>
                      
                      ) : (
                        <button className="btn btn-danger mx-2" onClick={() => handleActionWithAdminVerification("delete", user.id)}>
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
            <Link className="btn btn-outline-primary mx-2" to="/adduser">
              Add Member
            </Link>
          ) : (
            <button className="btn btn-outline-primary mx-2" onClick={() => handleAddWithAdminVerification("add")}>
              Add Member
            </button>
          )}
        </CardBody>
      </Card>

      {/* Admin Login Modal */}
      <AdminLoginModal show={showAdminModal} onHide={() => setShowAdminModal(false)} onLogin={handleAdminLogin} />
    </div>
  );
}
