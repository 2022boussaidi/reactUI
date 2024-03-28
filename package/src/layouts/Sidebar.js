import React, { useState } from "react";

import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";


const navigation = [
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
        icon: "bi bi-robot",
      },
      {
        title: "Workers  ",
        href: "/queues",
        icon: "bi bi-layout-text-sidebar-reverse",
      },
   
   
     
      {
        title: " Analytics",
        href: "/",
        icon: "bi bi-pie-chart-fill",
      },
  

  {
    
  
        title: "Alerts ",
        href: "/",
        icon: "bi bi-patch-exclamation-fill",
      },
  
    

      
      {
        title: "Log out ",
        href: "/",
        icon: "bi bi-box-arrow-in-right",
      },
  
  
];
const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-warning nav-link py-3"
                    : "nav-link text-white py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="warning"
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
