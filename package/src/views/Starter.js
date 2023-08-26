import { Col, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "./ui/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import TeamManagement from "../components/dashboard/TeamManagment";
//import CalendarComponent from "../components/dashboard/CalendarComponent";
import Members from "../components/dashboard/Members";
import Teams from "../components/dashboard/Teams";
import Projects from "../components/dashboard/Projects";

import { Link } from "react-router-dom";

const Starter = () => {
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
          <Members/>
        </Col>
        <Col sm="6" lg="6" xl="6" xxl="12">
          <Teams/>
        </Col>
        </Row>
        {/***<Row>
        <Col sm="6" lg="8" xl="7" xxl="6">
          <ProjectTables />
        </Col>
      </Row>
     
      {/***Table ***/}
      {/***<Row>
       
        <Col sm="6" lg="8" xl="7" xxl="6">
          <Feeds />
        </Col>
      </Row>
      {/***Blog Cards***/}
     
    </div>
  );
};

export default Starter;
