import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [showAll, setShowAll] = useState(false); // Indicates if all users should be shown

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

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">Members Listing</CardTitle>
            <button
              className="btn btn-outline-primary"
              onClick={handleSeeMore}
            >
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
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewuser/${user.id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/edituser/${user.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className="btn btn-outline-primary mx-2" to="/adduser">
            Add Member
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
