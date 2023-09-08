import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [visibleTeams, setVisibleTeams] = useState([]);
  const [showAll, setShowAll] = useState(false); // Indicates if all teams should be shown

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

  // Toggle between showing all teams or limited teams
  const handleSeeMore = () => {
    if (showAll) {
      setVisibleTeams(teams.slice(0, 2)); // Change 5 to the desired number
    } else {
      setVisibleTeams(teams);
    }
    setShowAll(!showAll);
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
            </table>
           
          </div>
          <Link className="btn btn-outline-primary mx-2" to="/addteam">
            Add Team
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
