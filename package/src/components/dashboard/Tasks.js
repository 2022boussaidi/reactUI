import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("http://localhost:8080/tasks");
    console.log(result.data);
    setTasks(result.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="container">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-end"></div>
          <CardTitle tag="h5">Tasks Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
           Tasks by project
          </CardSubtitle>
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">description</th>
                  <th scope="col">deadline</th>
                  <th scope="col">project</th>
                  <th scope="col">completed</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.description}</td> 
                    <td>{task.deadline}</td>  
                    <td>{task.project.name}</td>
                    <td>{task.completed === true ? "Yes" : "No"}</td>

                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewtask/${task.id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/edittask/${task.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className="btn btn-outline-primary mx-2" to="/addtask">
            Add Task
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
