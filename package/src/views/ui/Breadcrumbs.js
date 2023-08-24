import React from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import TopCards from "./TopCards";
import SalesChart from "./SalesChart"

const Breadcrumbs = () => {
  return (
    <div>
      <Row>
        <Col sm="6" lg="31">
          
            <TopCards
              bg="bg-light-warning text-warning"
              title="New Project"
              subtitle="Total projects"
              earning="XXXXX"
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
              earning="XXXX"
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
      <Row>
     <Col sm="6" lg="6" xl="6" xxl="12">
       <SalesChart/>
     </Col>
   </Row>
    </div>
     
  );
};

export default Breadcrumbs;
