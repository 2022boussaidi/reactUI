
import React, { useEffect, useState } from "react";
import axios from "axios";
import TopCards from "./TopCards"
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import SalesChart from "./SalesChart";

const Buttons = () => {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("http://localhost:8080/tasks");
    setTeams(result.data);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const result = await axios.get("http://localhost:8080/tasks");
    setTasks(result.data);
  };
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/projects");
    setProjects(result.data);
  };
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  const onRadioBtnClick = (rSelected) => {
    setRSelected(rSelected);
  };

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  return (
    <div>
      <div className="text-right mt-2" style={{display:"flex", justifyContent:"space-between"}}>
   
    <h2>Dashboard</h2>
    <Button color="success" style={{marginBottom:"10px"}}>Generate Report </Button>
  </div>
      
       
       
      
      
   

        {/***Top Cards***/}
      <Row>
       
        
       <Col sm="4" lg="31">
           
           <TopCards
             bg="bg-light-warning text-warning"
             title="New Project"
             subtitle="Total projects"
             earning={projects.length}
             icon="bi bi-basket3"
           >
            
           </TopCards>
        
         
       </Col>
       <Col sm="4" lg="31">
          
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle="Team size"
            earning={teams.length}
            icon="bi bi-bag"
          >
             
       
        </TopCards>
      </Col>
      <Col sm="4" lg="31">
           
           <TopCards
             bg="bg-light-warning text-warning"
             title="New Project"
             subtitle="Total tasks"
             earning={tasks.length}
             icon="bi bi-basket3"
           >
            
           </TopCards>
        
         
       </Col>
       </Row>
       <Row>
       <Col sm="6" lg="8" xl="7" xxl="12">
 
</Col>
        <Col sm="6" lg="8" xl="7" xxl="12">
          <SalesChart />
        </Col>
      </Row>
    </div>
  );
};

export default Buttons;
