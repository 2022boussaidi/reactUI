import { Col, Row } from "reactstrap";

import TopCards from "../components/dashboard/TopCards";



import Projects from "../components/dashboard/Projects";
import Tasks from "../components/dashboard/Tasks";




const Overview = () => {
  return (
    <div>
      {/***Top Cards***/}
      <Row>
       
        
        <Col sm="6" lg="31">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Total projects"
            earning="XXXXX"
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="31">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Team size"
            earning="XXXX"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***TeamMangement & Feed***/}
      <Row>
        <Col sm="4" lg="4" xl="6" xxl="10">
          <Projects/>
        </Col>
        <Col sm="4" lg="4" xl="6" xxl="10">
          <Tasks/>
        </Col>
        </Row>
        
     
     
    </div>
  );
};

export default Overview;
