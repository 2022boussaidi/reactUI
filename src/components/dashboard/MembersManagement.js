import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const MembersManagement = () => {
 
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
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-end">
           
          </div>
          <CardTitle tag="h5">Members Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview 
          </CardSubtitle>

          <table className="table border shadow">
          <thead>
            <tr>
              
              <th scope="col">Name</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  
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
          <div className="mt-3">
        <Link className="btn btn-primary" to="/adduser">Add member</Link>
      </div>
        </CardBody>
      </Card>
      
    </div>
  );
};

export default MembersManagement;
