
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
import Inventory from "../../components/dashboard/Inventory";

const Buttons = () => {

 
  const [sites, setSites] = useState([]);
  const [robots, setRobots] = useState([]);
  const [queues, setQueues] = useState([]);
  const [inventory, setInventory] = useState([]);

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
  useEffect(() => {
    loadInventory();
  }, []); // Reload sites when current page changes

  const loadInventory = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/inventory",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      // Extraction des données de l'inventaire
      const inventoryData = response.data.inventories;

      // Mise en forme des données pour les adapter à l'affichage dans votre tableau
      const formattedInventory = inventoryData.map(item => ({
        Scenarios : item.kpi.site.detail.scenarios,
        Deployment_Areas: item.kpi.site.detail.deployment_areas,
        Running: item.kpi.robot.detail.running,
        Delayed:item.kpi.robot.detail.delayed,
        Stopped: item.kpi.robot.detail.stopped,
        Runningwo: item.kpi.worker.detail.running,
       Delayedwo: item.kpi.worker.detail.delayed,
      Stoppedwo: item.kpi.worker.detail.stopped

      }));

      // Définition des données formatées dans l'état
      setInventory(formattedInventory);
    }catch (error) {
        console.error("Error loading inventory:", error);
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
             icon="bi bi-robot"
             details={["scenarios :" , "deployment_area :"]} // Array of details
           >
            
           </TopCards>
        
         
       </Col>
       <Col sm="4" lg="31">
          
          <TopCards
            bg="bg-light-info text-info"
            title="Sales"
            subtitle=" Total robots"
            earning={robots.length}
            icon="bi bi-robot"
            details={["running :" , "deplayed :" , "stopped :" ]} 
          >
             
       
        </TopCards>
      </Col>
      <Col sm="4" lg="31">
           
           <TopCards
             bg="bg-light-success text-success"
             title="New Project"
             subtitle="Total workers"
             earning={queues.length}
             icon="bi bi-robot"
             details={["running :" , "deplayed :"," stopped :" ]} 
           >
            
           </TopCards>
        
         
       </Col>
       </Row>
       <Row>
       <Col sm="6" lg="6" xl="6" xxl="12">
          <Inventory/>
        </Col>
        
  
      </Row>
    </div>
  );
};

export default Buttons;
