import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
    subtitle: "Navigation",
  },
  {
    title: "Create request",
    href: "/starter",
    icon: "bi bi-speedometer2",
    subtitle: "Requests",
  },
  {
    title: "Search",
    href: "/overview",
    icon: "bi bi-patch-check",
    subtitle: "Offer",
  },
  {
    title: "Create an offer",
    href: "/events",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Steps",
    href: "/breadcrumbs",
    icon: "bi bi-bell",
   
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
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                {navi.subtitle && ( // Display subtitle if it exists
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
