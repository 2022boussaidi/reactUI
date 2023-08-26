import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

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

  // Group tasks by project
  const tasksByProject = tasks.reduce((acc, task) => {
    const projectId = task.project.id;
    if (!acc[projectId]) {
      acc[projectId] = {
        project: task.project,
        tasks: []
      };
    }
    acc[projectId].tasks.push(task);
    return acc;
  }, {});

  return (
    <div className="container">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Tasks Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Tasks by Project
          </CardSubtitle>
          <div className="py-4">
            {Object.values(tasksByProject).map((projectData, index) => (
              <div key={index} className="mb-4">
                <h5 className="mb-3 text-primary">
                  Project: {projectData.project.name}
                </h5>
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Completed</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.tasks.map((task, taskIndex) => (
                      <tr key={taskIndex}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.deadline}</td>
                        <td>{task.completed ? "Yes" : "No"}</td>
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
            ))}
          </div>
          <Link className="btn btn-outline-primary mx-2" to="/addtask">
            Add Task
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
