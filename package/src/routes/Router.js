import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Dashboard.js"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
/**************components *************************/
const AddUser = lazy(() => import ("../components/users/AddUser.js"))
const EditUser = lazy(() => import ("../components/users/EditUser.js"))
const ViewUser = lazy(() => import ("../components/users/ViewUser.js"))
const AddTeam = lazy(() => import ("../components/teams/AddTeam.js"))
const ViewTeam= lazy(() => import ("../components/teams/ViewTeam.js"))
const Login = lazy(() => import("../components/pages/Login.js"));
const Register = lazy(() => import("../components/pages/Register.js"));
const AddProject = lazy(() => import ("../components/projects/AddProject.js"))
const Projects= lazy(() => import ("../components/dashboard/Projects.js"))
const ViewProject = lazy(() => import ("../components/projects/ViewProject.js"))
const EditProject = lazy(() => import ("../components/projects/EditProject.js"))
const Overview = lazy(() => import("../views/Overview.js"));
const Events = lazy(() => import("../components/dashboard/Events.js"))
const AddEvent = lazy(() => import ("../components/events/AddEvent.js"))
const EditEvent = lazy(() => import ("../components/events/EditEvent.js"))
const Contact = lazy(() => import ("../components/dashboard/ContactCard.js"))
const AddTask = lazy(() => import ("../components/tasks/AddTask.js"))
const EditTask = lazy(() => import ("../components/tasks/EditTask.js"))
const Prediction= lazy(() => import ("../components/dashboard/Glass.js"))











/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      {path:"/adduser" , exact : true , element:<AddUser />},
      {path:"/edituser/:id" , exact : true , element:<EditUser />},
      {path:"/viewuser/:id" , exact : true , element:<ViewUser />},
      {path:"/addteam" , exact : true , element:<AddTeam />},
      {path:"/viewteam/:id" , exact : true , element:<ViewTeam />},
      { path: "/login", exact: true, element: <Login /> },
      { path: "/register", exact: true, element: <Register /> },
      { path: "/addproject", exact: true, element: <AddProject /> },
      { path: "/projects", exact: true, element: <Projects /> },
      {path:"/viewproject/:id" , exact : true , element:<ViewProject />},
      {path:"/editproject/:id" , exact : true , element:<EditProject />},
      { path: "/overview", exact: true, element: <Overview /> },
      { path: "/events", exact: true, element: <Events /> },
      { path: "/addevent", exact: true, element: <AddEvent /> },
      { path: "/editevent/:id", exact: true, element: <EditEvent /> },
      { path: "/contact", exact: true, element: <Contact /> },
      { path: "/addtask", exact: true, element: <AddTask /> },
      { path: "/edittask/:id", exact: true, element: <EditTask /> },
      { path: "/predict", exact: true, element: <Prediction/> },
      







    ],
  },
];

export default ThemeRoutes;
