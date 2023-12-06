import React, { useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button, Col, Row } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNum: "",
    country: "",
    role: "farmer",
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let endpoint = "";

    switch (formData.role) {
      case "farmer":
        endpoint = "http://localhost:8000/farmers/";
        break;
      case "consumer":
        endpoint = "http://localhost:8000/consumers/";
        break;
      case "mill_manager":
        endpoint = "http://localhost:8000/mill_managers/";
        break;
      case "administrator":
        endpoint = "http://localhost:8000/administrators/";
        break;
      default:
        break;
    }

    axios
      .post(endpoint, formData)
      .then((response) => {
        toast.success("Registration successful!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Col xs="12" md="15">
      <Card>
        <CardBody>
          <CardTitle tag="h2">General information </CardTitle>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Input type="text" name="country" value={formData.country} onChange={handleChange} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="phoneNb">Phone Number</Label>
                  <Input type="tel" name="phoneNb" value={formData.phoneNb} onChange={handleChange} required />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="role">Role</Label>
                  <Input type="select" name="role" value={formData.role} onChange={handleChange}>
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
                      <Input type="text" name="id" value={formData.id} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="website">Website</Label>
                      <Input type="text" name="website" value={formData.website} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="yearofCreation">Year Of Creation</Label>
                      <Input type="text" name="yearofCreation" value={formData.yearofCreation} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="millingCapacity">MillingCapacity</Label>
                      <Input type="text" name="millingCapacity" value={formData.millingCapacity} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="nbofchains">NumberOfChains</Label>
                      <Input type={"number"} name="NumberOfChains" value={formData.NumberOfChains} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="hasLab">Has Lab</Label>
                      <Input type="select" name="hasLab" value={formData.has_lab} onChange={handleChange}>
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
                      <Input type="select" name="hasPackagingUnit" value={formData.has_packaging_unit} onChange={handleChange}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="storageCapacity">Storage Capacity</Label>
                      <Input type="double" name="storageCapacity" value={formData.storageCapacity} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="practice">Practice</Label>
                      <Input type="select" name="practice" value={formData.practice} onChange={handleChange}>
                        <option value="conventional">Conventional</option>
                        <option value="organic">Organic</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="quantity_certification">Quantity certificate</Label>
                      <Input type="text" name="quantity_certification" value={formData.quantity_certification} onChange={handleChange} required />
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Col>
  );
};

export default Register;
