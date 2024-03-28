import React, { useState } from "react";
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
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfoCircle, faQuestionCircle, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/NavStyle.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleMyAccount = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }

    fetch("http://localhost:8080/current", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }
      return response.json();
    })
    .then(data => {
      setUserInfo(data);
      toggleModal(); // Open the modal after fetching user information
    })
    .catch(error => {
      console.error('Error fetching user information:', error);
    });
  };

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <Navbar color="primary" dark expand="md">
        <div className="d-flex align-items-center">
          <Button color="primary" onClick={showMobilemenu}>
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <NavbarBrand href="/" className="d-lg"></NavbarBrand>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-three-dots-vertical"></i>}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem color="dark">
              <Link to="https://www.ip-label.fr" className="nav-link">
                <FontAwesomeIcon icon={faInfoCircle} /> About Ekara
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/contact" className="nav-link">
                <FontAwesomeIcon icon={faQuestionCircle} /> Help
              </Link>
            </NavItem>
            <Form inline>
              <Row>
                <Col xs="auto">
                  <InputGroup>
                    <Input type="text" placeholder="Search" className="mr-sm-2" />
                    <Button color="info">
                      <FontAwesomeIcon icon={faSearch} />
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
              <DropdownItem onClick={handleMyAccount}>My Account</DropdownItem>
              <DropdownItem>Notifications</DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></DropdownItem>
              <DropdownItem divider />
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>User Information</ModalHeader>
        <ModalBody>
          {userInfo && (
            <>
              <p>Email: {userInfo.email}</p>
              <p>First Name: {userInfo.firstname}</p>
              <p>Last Name: {userInfo.lastname}</p>
              <p>Role Name: {userInfo.roleName}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Header;
