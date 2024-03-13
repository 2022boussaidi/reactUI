import React, { useState } from "react";

import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";


const navigation = [
  {
    title: "Home",
    items: [
      {
        title: "Dashboard",
        href: "/buttons",
        icon: "bi bi-grid-fill",
      },
      {
        title: "Sites",
        href: "/sites",
        icon: "bi bi-newspaper",
      },
      {
        title: "Robots  ",
        href: "/robots",
        icon: "bi bi-list-columns",
      },
      {
        title: "Workers  ",
        href: "/queues",
        icon: "bi bi-layout-text-sidebar-reverse",
      },
    ]
  },
  
  {
    title: "Sites overview",
    items: [
     
      {
        title: " charts",
        href: "/sites",
        icon: "bi bi-bar-chart",
      },
    ]
  },
  {
    title: "Robots overview",
    items: [
      
      {
        title: " charts",
        href: "/sites",
        icon: "bi bi-bar-chart-line-fill",
      },
    ]
  },
    
      
  
];

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  const toggleDropdown = (index) => {
    setSelectedItem(index);
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => toggleDropdown(null)}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((subtitle, index) => (
            <React.Fragment key={index}>
              <NavItem className="sidenav-bg">
                <span className="subtitle">{subtitle.title}</span>
              </NavItem>
              {subtitle.items.map((navi, subIndex) => (
                <NavItem key={subIndex} className="sidenav-bg">
                  <Link
                    to={navi.href}
                    className={
                      location.pathname === navi.href
                        ? "text-primary nav-link py-3"
                        : "nav-link text-secondary py-3"
                    }
                    onClick={() => toggleDropdown(subIndex)}
                  >
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </Link>
                </NavItem>
              ))}
              {selectedItem === index && dropdownOpen && (
                <div>
                  {/* Render dropdown items here */}
                  {subtitle.items.map((navi, subIndex) => (
                    <NavItem key={subIndex} className="sidenav-bg">
                      <Link
                        to={navi.href}
                        className={
                          location.pathname === navi.href
                            ? "text-primary nav-link py-3"
                            : "nav-link text-secondary py-3"
                        }
                      >
                        <i className={navi.icon}></i>
                        <span className="ms-3 d-inline-block">
                          {navi.title}
                        </span>
                      </Link>
                    </NavItem>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
          <Button
            color="primary"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.ip-label.fr"
          >
            Know more
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
