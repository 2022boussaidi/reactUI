import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  
  },
  {
    title: "Teams",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  
  
  {
    title: "Projects",
    href: "/overview",
    icon: "bi bi-patch-check",
  },
  {
    title: "Calendar",
    href: "/events",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Report",
    href: "/breadcrumbs",
    icon: "bi bi-bell",
  },
  {
    title: "Chat",
    href: "/about",
    icon: "bi bi-people",
  },
  {
    title: "Prediction",
    href: "/predict",
    icon: "bi bi-people",
  },
  {
    title: "About",
    href: "/Rdd",
    icon: "bi bi-people",
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
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="primary"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://esprit.tn"
          >
            Know more
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
