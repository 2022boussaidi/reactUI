import React, { useState } from "react";

import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";


const navigation = [
  {
    title: "Home",
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
        items: [
          { title: "Performance", href: "robots/performnace" , icon: "bi bi-bar-chart-line-fill ms-2" },
         
          
        ],
      },
      {
        title: "Workers  ",
        href: "/queues",
        icon: "bi bi-layout-text-sidebar-reverse",
        items: [
          { title: "Scenarios", href: "/scenarios" , icon: "bi bi-stack ms-2"},
          { title: "Zones", href: "/zones" , icon: "bi bi-pin-map ms-2"},
        ],
      },
      {
        title: "Dive deep",
        icon: "bi bi-zoom-in",
        items: [
          { title: "worspaces", href: "/workspaces", icon: "bi bi-building-fill ms-2" },
          { title: "users", href: "/users" , icon: "bi bi-person-lines-fill ms-2"},
          { title: "clients", href: "/clients", icon: "bi bi-people-fill ms-2" },
          { title: "user journey", href: "management/user journey", icon: "bi bi-person-vcard ms-2" },
          
        ],
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
    <NavItem key={index}>
      <Link
        to={navi.href}
        className={
          location.pathname === navi.href
            ? "text-warning nav-link py-3 "
            : "nav-link text-white py-3"
        }
      >
        <i className={navi.icon}></i>
        <span className="ms-3 d-inline-block">{navi.title}</span>
      </Link>
      {navi.items && navi.items.length > 0 && (
        <Nav vertical className="ml-4">
          {navi.items.map((item, subIndex) => (
            <NavItem key={subIndex}  className="sidenav-bg">
              <Link
                to={item.href}
                className={
                  location.pathname === item.href
                    ? "text-warning nav-link py-1 "
                    : "nav-link text-white py-1"
                }
              >
                 <i className={item.icon}></i>
                <span className="ms-3 d-inline-block">{item.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      )}
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
