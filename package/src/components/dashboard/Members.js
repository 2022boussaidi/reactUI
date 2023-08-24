import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default function Home() {
  const [users, setUsers] = useState([]);

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
 

  return (
    <div className="container">
        
      <Card>
        <CardBody>
          <div className="d-flex justify-content-end">
            
          </div>
          <CardTitle tag="h5">Members Listing</CardTitle>
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
            {users.map((user, index) => (
              <tr>
               
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
