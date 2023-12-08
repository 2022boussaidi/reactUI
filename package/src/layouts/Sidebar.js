import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = {
  admin: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: "bi bi-hdd-stack",
      subtitle: "Navigation",
    },
    {
      title: "Create request",
      href: "/admin/create-request",
      icon: "bi bi-speedometer2",
      subtitle: "Requests",
    },
    {
      title: "Search",
      href: "/admin/search",
      icon: "bi bi-patch-check",
      subtitle: "Offer",
    },
    {
      title: "Create an offer",
      href: "/admin/create-offer",
      icon: "bi bi-hdd-stack",
    },
    {
      title: "Steps",
      href: "/admin/steps",
      icon: "bi bi-bell",
    },
  ],
  farmer: [
    {
      title: "My goods",
      href: "/farmer/goods",
      icon: "bi bi-person",
     
    },
    {
      title: "Dashboard",
      href: "/farmer/dashboard",
      icon: "bi bi-person",
   
    },
    {
      title: "Storage Area",
      href: "/farmer/dashboard",
      icon: "bi bi-pencil-square",
    
    },{
      title: "Create Request",
      href: "/farmer/dashboard",
      icon: "bi bi-pencil-square",

    },{
      title: "Create an Offer",
      href: "/farmer/dashboard",
      icon: "bi bi-pencil-square",
   
    },
    {
      title: "Search",
      href: "/farmer/dashboard",
      icon: "bi bi-search",
      
    },
    // Add more farmer-specific items as needed
  ],
  mileManager: [
    {
      title: "Mile Manager Dashboard",
      href: "/mile-manager/dashboard",
      icon: "bi bi-person",
      subtitle: "Navigation",
    },
    // Add more mileManager-specific items as needed
  ],
  consumer: [
    {
      title: "Consumer Dashboard",
      href: "/consumer/dashboard",
      icon: "bi bi-person",
      subtitle: "Navigation",
    },
    // Add more consumer-specific items as needed
  ],
};

const Sidebar = ({ userRole }) => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const navItems = navigation[userRole] || [];

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
          {navItems.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                {navi.subtitle && (
                  <div className="d-block text-muted subtitle mb-1">
                    {navi.subtitle}
                  </div>
                )}
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
