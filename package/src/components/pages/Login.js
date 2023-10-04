import React, { useState } from 'react';
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

const Login = () => {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to track if the input is focused
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
  };

  return (
    <Col xs="12" md="6">
      <Card>
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Login</div>
            <div style={{ color: '#00cbff' }}>Don't have an account?</div>
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
                style={{ borderColor: emailFocused ? '#00cbff' : '' ,
                boxShadow: emailFocused ? 'none' : ''}} // Apply #00cbff border when focused
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
                style={{ borderColor: passwordFocused ? '#00cbff' : '',
                boxShadow: passwordFocused ? 'none' : '',  }} // Apply #00cbff border when focused
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Login;
