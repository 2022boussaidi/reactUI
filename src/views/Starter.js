import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import TeamManagement from "../components/dashboard/TeamManagement";
import CalendarComponent from "../components/dashboard/CalendarComponent";
import MembersManagement from "../components/dashboard/MembersManagement";


const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
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
      {/***MembersMangement & Feed***/}
      <Row>

        <Col sm="4" lg="4" xl="6" xxl="6">
          <MembersManagement/>
        </Col>
        <Col sm="4" lg="4" xl="6" xxl="6">
          <TeamManagement/>
        </Col>
        
       
      </Row>
      {/***Table ***/}
      <Row>
      <Col sm="6" lg="8" xl="7" xxl="6">
      <CalendarComponent/>
    </Col>
        
        <Col sm="6" lg="8" xl="7" xxl="6">
        <ProjectTables />
      </Col>
      </Row>
      {/***Blog Cards***/}
     
    </div>
  );
};

export default Starter;