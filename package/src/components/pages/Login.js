import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
// Import your custom icon images
import facebookIcon from "../../assets/images/logos/logo_fcbk.png";
import twitterIcon from "../../assets/images/logos/logo_twit.png";
import googleIcon from "../../assets/images/logos/google.png";
const Login = () => {
  // State to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to track if the input is focused
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // State to track "Keep me signed in" checkbox
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
  };

  // Handle "Keep me signed in" checkbox change
  const handleKeepMeSignedInChange = () => {
    setKeepMeSignedIn(!keepMeSignedIn);
  };

  return (
    <Row style={{ marginLeft: "600px", marginRight:"5px" }}>
    
      <Card>
        <CardBody>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Login</div>
            <Link  to="/register" style={{ color: "#00cbff" }}>Don't have an account?</Link>
          </div>

          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="Enter email address"
                style={{
                  borderColor: emailFocused ? "#00cbff" : "",
                  boxShadow: emailFocused ? "none" : "",
                }} // Apply #00cbff border when focused
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Enter your password"
                style={{
                  borderColor: passwordFocused ? "#00cbff" : "",
                  boxShadow: passwordFocused ? "none" : "",
                }} // Apply #00cbff border when focused
              />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={keepMeSignedIn}
                    onChange={handleKeepMeSignedInChange}
                    
                  />{" "}
                  Keep me sign in
                </Label>
              </FormGroup>

              <a href="#" style={{ color: "black" }}>
                Forgot password?
              </a>
            </div>
            <div style={{ marginTop: "20px" }}>
            <Button  style={{ width: "600px" ,marginTop: "20px"}} color="blue" type="submit">
              Login
            </Button>
            </div>
          </Form>
          <Row style={{ marginLeft: "260px" ,marginTop:"20px" }} > Login with  </Row>
          <div style={{ marginTop: "20px" , marginBottom:"20px" }}>
            <Button style={{ borderColor: "gray" ,marginLeft:"5px"}} color="white" className="mr-2">
            <img src={facebookIcon} alt="Facebook"style={{ width: "30px", height: "20px", marginRight: "8px" }} />  Facebook
            </Button>
            <Button style={{ borderColor: "gray",marginLeft:"100px" }}color="white" className="mr-2">
            <img src={twitterIcon} alt="Twitter" style={{ width: "30px", height: "20px", marginRight: "8px" }} />    Twitter
            </Button>
            <Button style={{ borderColor: "gray", marginLeft: "100px" }} color="white">
              <img src={googleIcon} alt="Google" style={{ width: "30px", height: "20px", marginRight: "8px" }} /> Google
            </Button>          </div>
        </CardBody>
      </Card>
   
    </Row>
  );
};

export default Login;
