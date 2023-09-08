import { Col, Row } from "reactstrap";
import TopCards from "./ui/TopCards";
import Projects from "../components/dashboard/Projects";
import Tasks from "../components/dashboard/Tasks";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";


const Overview = () => {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await axios.get("http://localhost:8080/teams");
    setTeams(result.data);
  };
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/projects");
    setProjects(result.data);
  };
  return (
    <div>
       <h2>Project overview</h2>
    {/***Top Cards***/}
    <Row>
     
      
    <Col sm="6" lg="31">
        
        <TopCards
          bg="bg-light-warning text-warning"
          title="New Project"
          subtitle="Total projects"
          earning={projects.length}
          icon="bi bi-basket3"
        >
          <div className="d-flex align-items-center justify-content-end">
        <Link className="btn btn-outline-primary mx-2" to="/addproject">
          Add Project
        </Link>
        </div>
        </TopCards>
     
      
    </Col>
    <Col sm="6" lg="31">
       
       <TopCards
         bg="bg-light-info text-info"
         title="Sales"
         subtitle="Team size"
         earning={teams.length}
         icon="bi bi-bag"
       >
          <div className="d-flex align-items-center justify-content-end">
       <Link className="btn btn-outline-primary mx-2" to="/addteam">
         Add Team
       </Link>
     </div>
     </TopCards>
   </Col>
    </Row>
      {/***TeamMangement & Feed***/}
      <Row>
      <Col sm="6" lg="6" xl="6" xxl="12">
          <Projects/>
        </Col>
        <Col sm="6" lg="6" xl="6" xxl="12">
          <Tasks/>
        </Col>
        </Row>
        
     
     
    </div>
  );
};

export default Overview;
