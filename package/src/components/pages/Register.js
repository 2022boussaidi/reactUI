import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row, // Import Row from reactstrap
} from "reactstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNum: "",
    country: "",
    website: "",
    yearOfCreation: "",
    millingCapacity: "",
    NumberOfChains: "",
    has_lab: "",
    has_packaging_unit: "",
    storageCapacity: "",
    practice: "",
    Qualitycertificate: "",
    Idmill_manager: "",
    role: "farmer", // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform registration logic here based on the selected role
    switch (formData.role) {
      case "farmer":
        alert("Registered as a Farmer!");
        break;
      case "consumer":
        alert("Registered as a Consumer!");
        break;
      case "mill_manager":
        alert("Registered as a Mill Manager!");
        break;
      case "administrator":
        alert("Registered as an Administrator!");
        break;
      default:
        break;
    }
  };

  return (
    <Col xs="12" md="15">
      <Card>
        <CardBody>
          <CardTitle tag="h2">Registration Form</CardTitle>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="address"
                    name="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Input
                    type="country"
                    name="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="phoneNb">Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNum}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="role">Role</Label>
                  <Input
                    type="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="farmer">Farmer</option>
                    <option value="consumer">Consumer</option>
                    <option value="mill_manager">Mill Manager</option>
                    <option value="administrator">Administrator</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {formData.role === "mill_manager" && (
              <>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="id">Mill manager Id</Label>
                      <Input
                        type="text"
                        name="id"
                        value={formData.Idmill_manager}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="website">Website</Label>
                      <Input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="yearOfCreation">Year Of Creation</Label>
                      <Input
                        type="text"
                        name="yearofCreation"
                        value={formData.yearOfCreation}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="millingCapacity">MillingCapacity</Label>
                      <Input
                        type="text"
                        name="millingCapacity"
                        value={formData.millingCapacity}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="nbofchains">NumberOfChains</Label>
                      <Input
                        type={"number"}
                        name="NumberOfChains"
                        value={formData.NumberOfChains}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="hasLab">Has Lab</Label>
                      <Input
                        type="select"
                        name="hasLab"
                        value={formData.has_lab}
                        onChange={handleChange}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="hasPackagingUnit">Has packaging unit?</Label>
                      <Input
                        type="select"
                        name="hasPackagingUnit"
                        value={formData.has_packaging_unit}
                        onChange={handleChange}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="storageCapacity">Storage Capacity</Label>
                      <Input
                        type="double"
                        name="storageCapacity"
                        value={formData.storageCapacity}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="practice">Practice</Label>
                      <Input
                        type="select"
                        name="practice"
                        value={formData.practice}
                        onChange={handleChange}
                      >
                        <option value="conventional">Conventional</option>
                        <option value="organic">Organic</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="quantity certification">Quantity certificate</Label>
                      <Input
                        type="text"
                        name="=quantity certification"
                        value={formData.Qualitycertificate}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
            <Button color="primary" type="submit">
              Register
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
