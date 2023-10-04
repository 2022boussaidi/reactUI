
import { Link } from "react-router-dom";
import React from "react";
import logo from "../assets/images/logos/olive.jpg";

const Logo = () => {
  return (
    <Link to="/">
     <div>
    <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
  </div>
    </Link>
  );
};

export default Logo;
