
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
import ProjectPerformanceChart from "../../components/dashboard/ProjectPerformanceChart";

const Buttons = () => {


  const [sites, setSites] = useState([]);
  const [robots, setRobots] = useState([]);
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    loadQueues();
  }, []);

  const loadQueues = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callqueues",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setQueues(response.data.queues);
    } catch (error) {
      console.error("Error loading queues:", error);
    }
  };

  useEffect(() => {
    loadRobots();
  }, []);

  const loadRobots = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callrobots",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setRobots(response.data.robots);
    } catch (error) {
      console.error("Error loading robots:", error);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/callsites",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setSites(response.data.sites);
    } catch (error) {
      console.error("Error loading sites:", error);
    }
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
   
    <h2>dashboard</h2>
  
 </div>
      
       
       
      
      
   

        {/***Top Cards***/}
     <Row>
       
        
        <Col sm="4" lg="31">
           
           <TopCards
             bg="bg-light-warning text-warning"
             title="New Project"
             subtitle="Total sites"
             earning={sites.length}
             icon="bi bi-database"
           >
            
           </TopCards>
        
         
       </Col>
       <Col sm="4" lg="31">
          
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle=" Total robots"
            earning={robots.length}
            icon="bi bi-bag"
          >
             
       
        </TopCards>
      </Col>
      <Col sm="4" lg="31">
           
           <TopCards
             bg="bg-light-success text-success"
             title="New Project"
             subtitle="Total workers"
             earning={queues.length}
             icon="bi bi-basket3"
           >
            
           </TopCards>
        
         
       </Col>
       </Row>
       <Row>
       <Col sm="6" lg="8" xl="7" xxl="12">
 
  </Col>
        
      </Row>
    </div>
  );
};

export default Buttons;
