import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupText,
  Input,
  InputGroup,
  Container,
  Media,
  InputGroupAddon,
  Row,Col // Import InputGroupAddon from reactstrap
} from "reactstrap";

import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faInfoCircle, faQuestionCircle, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../assets/scss/NavStyle.css";
import Logo from "./Logo";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate(); // Access to the navigate function

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const handleLogout = () => {
    // Perform logout actions here, such as clearing token from local storage
    localStorage.removeItem('token');
    // Redirect to login page after logout
    navigate('/');
  };

  return (
    <Navbar color="primary" dark expand="md" >
      <div className="d-flex align-items-center">
       
        <Button
          color="primary"
          
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <NavbarBrand href="/" className="d-lg">
          
        </NavbarBrand>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem color="dark">
            <Link to="https://www.ip-label.fr" className="nav-link">
              <FontAwesomeIcon icon={faInfoCircle} /> {/* Icon for "About Ekara" */}
              About Ekara
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/contact" className="nav-link">
              <FontAwesomeIcon icon={faQuestionCircle} /> {/* Icon for "Contact" */}
              Help
            </Link>
          </NavItem>
          <Form inline>
  <Row>
    <Col xs="auto">
      <InputGroup>
        <Input type="text" placeholder="Search" className="mr-sm-2" />
        
          <Button color="info">
          <FontAwesomeIcon icon={faSearch}  />
            </Button>
       
      </InputGroup>
    </Col>
  </Row>
</Form>

        </Nav> 
        
       
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <FontAwesomeIcon icon={faUser} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
           
            <DropdownItem>Notifications</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></DropdownItem>
            <DropdownItem divider />
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
