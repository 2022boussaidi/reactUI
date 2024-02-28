import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Robots from "../components/dashboard/Robots";

export default function OverviewRobots() {
 
  return (
    <div>
       <h4>Robot management</h4>
      {/***Top Cards***/}
     
      <Row>
      
      
        <Col sm="6" lg="6" xl="6" xxl="12">
          <Robots/>
        </Col>
        
        </Row>
       
     
    </div>
  );
}
