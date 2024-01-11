import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import facebookIcon from "../../assets/images/logos/logo_fcbk.png";
import twitterIcon from "../../assets/images/logos/logo_twit.png";
import googleIcon from "../../assets/images/logos/google.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        email,
        password,
      });

      // Handle the response here (e.g., store user information, redirect, etc.)
      setLoginSuccess(true);
      setLoginError(null);
      console.log("Login successful:", response.data);
    } catch (error) {
      // Handle error (e.g., display error message)
      setLoginSuccess(false);
      setLoginError("Invalid email or password. Please try again.");
      console.error("Login failed:", error.response.data);
    }
  };

  const handleKeepMeSignedInChange = () => {
    setKeepMeSignedIn(!keepMeSignedIn);
  };

  return (
    <Row style={{ marginLeft: "500px", marginRight: "5px" }}>
      <Card>
        <CardBody>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Login</div>
            <Link to="/register" style={{ color: "#00cbff" }}>
              Don't have an account?
            </Link>
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
                }}
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
                }}
              />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={keepMeSignedIn}
                    onChange={handleKeepMeSignedInChange}
                  />{" "}
                  Keep me signed in
                </Label>
              </FormGroup>
              <a href="#" style={{ color: "black" }}>
                Forgot password?
              </a>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button style={{ width: "600px", marginTop: "20px" }} color="blue" type="submit">
                Login
              </Button>
            </div>
          </Form>

          {loginSuccess && (
            <Alert color="success" style={{ marginTop: "20px" }}>
              Login successful! Redirecting...
            </Alert>
          )}

          {loginError && (
            <Alert color="danger" style={{ marginTop: "20px" }}>
              {loginError}
            </Alert>
          )}

          <Row style={{ marginLeft: "260px", marginTop: "20px" }}> Login with </Row>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Button style={{ borderColor: "gray", marginLeft: "5px" }} color="white" className="mr-2">
              <img src={facebookIcon} alt="Facebook" style={{ width: "30px", height: "20px", marginRight: "8px" }} /> Facebook
            </Button>
            <Button style={{ borderColor: "gray", marginLeft: "100px" }} color="white" className="mr-2">
              <img src={twitterIcon} alt="Twitter" style={{ width: "30px", height: "20px", marginRight: "8px" }} /> Twitter
            </Button>
            <Button style={{ borderColor: "gray", marginLeft: "100px" }} color="white">
              <img src={googleIcon} alt="Google" style={{ width: "30px", height: "20px", marginRight: "8px" }} /> Google
            </Button>
          </div>
        </CardBody>
      </Card>
    </Row>
  );
};

export default Login;
