import axios from "axios";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddTeam() {
  let navigate = useNavigate();
  const [team, setTeam] = useState({
    name: "",
  });



  const { name} = team;
  const onInputChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
};
    const onSubmit =async (e) => {
     e.preventDefault();
    await axios.post("http://localhost:8080/teams",team);
    navigate("/");
    };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Team</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Team Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter TeamName"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          
         
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}