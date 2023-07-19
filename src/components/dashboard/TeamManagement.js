import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);

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

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Team Management</CardTitle>
          <Table className="border shadow">
            <thead>
              <tr>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>
                
                    {team.members.map((user, index) => (
                      <span key={user.id}>
                        {index > 0 && ", "}
                        {user.username}
                      </span>
                    ))}
                  </td>
                  <td>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/editteam/${team.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteTeam(team.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-3">
            <Link className="btn btn-primary" to="/addteam">
              Add Team
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TeamManagement;
