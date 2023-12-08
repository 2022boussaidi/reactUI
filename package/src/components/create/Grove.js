
import React, { useEffect, useState } from "react";
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
 Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
  } from "reactstrap";



const Grove = () => {
 
    const [groveDetails, setGroveDetails] = useState({
        isOwner: false,
        address: "",
        latitude: 0.0,
        longitude: 0.0,
        treeAge: 0,
        totalArea: 0,
        areaUnit: "Hectare",
        density: 0.0,
        varietyTrees: "",
        typeOfSoil: "Sandy",
        fertilizationProduct: "",
        fieldPicture: null,
        pesticideSprays: false,
        croppingSystem: [],
        practice: [],
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGroveDetails((prevDetails) => ({
          ...prevDetails,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
    
      const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setGroveDetails((prevDetails) => ({
          ...prevDetails,
          [name]: checked,
        }));
      };
    
      const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setGroveDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the submission logic (e.g., API call to save grove details)
        console.log("Grove details submitted:", groveDetails);
      };
    
      return (
        <Row>
        <Col xs="12" md="6">
        <Card>
          <CardBody>
            <h5>Grove Details</h5>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                
              </FormGroup>
              <FormGroup>
                <Label for="address"> Grove Address:</Label>
                <Input type="text" id="address" name="address" value={groveDetails.address} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="address"> GPS:</Label>
                <Input type="text" id="address" name="address" value={groveDetails.gpsl} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="latitude">Latitude:</Label>
                <Input type="number" id="latitude" name="latitude" value={groveDetails.latitude} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="longitude">Longitude:</Label>
                <Input type="number" id="longitude" name="longitude" value={groveDetails.longitude} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="treeAge">Tree Age:</Label>
                <Input type="number" id="treeAge" name="treeAge" value={groveDetails.treeAge} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="totalArea">Total Area:</Label>
                <Input type="number" id="totalArea" name="totalArea" value={groveDetails.totalArea} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="areaUnit">Area Unit:</Label>
                <Input type="select" id="areaUnit" name="areaUnit" value={groveDetails.areaUnit} onChange={handleSelectChange}>
                  <option value="Hectare">Hectare</option>
                  {/* Add more options for different area units */}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="density">Density:</Label>
                <Input type="number" id="density" name="density" value={groveDetails.density} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="varietyTrees">Variety of Trees:</Label>
                <Input type="text" id="varietyTrees" name="varietyTrees" value={groveDetails.varietyTrees} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="typeOfSoil">Type of Soil:</Label>
                <Input type="select" id="typeOfSoil" name="typeOfSoil" value={groveDetails.typeOfSoil} onChange={handleSelectChange}>
                  <option value="Sandy">Sandy</option>
                  <option value="Silty">Silty</option>
                  <option value="Clay">Clay</option>
                  <option value="Loamy">Loamy</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="fertilizationProduct">Fertilization Product:</Label>
                <Input
                  type="text"
                  id="fertilizationProduct"
                  name="fertilizationProduct"
                  value={groveDetails.fertilizationProduct}
                  onChange={handleChange}
                />
              </FormGroup>
              {/* Add more form fields for other details */}
              <Button type="submit" color="blue">
                Save Grove Details
              </Button>
            </form>
          </CardBody>
        </Card>
        </Col>
        <Col sm="6" lg="31">
            <Card>
        <CardBody>
        <h5>Your groves</h5>
                <Table>
                  <thead>
                    <tr>
                      <th>Grove Id </th>
                      <th>Adress</th>
                      <th>Type</th>
                     
                  
                
                    </tr>
                  </thead>
                  <tbody>
                    
                      <tr >
                        <td>1</td>
                        <td>Tunisia </td>
                        <td>bio</td>
                       <td>
                       
                    <DropdownToggle >...</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem >Details</DropdownItem>
                      <DropdownItem >Delete</DropdownItem>
                    </DropdownMenu>
                 
                       </td>
                      </tr>
                    
                  </tbody>
                </Table>
              </CardBody>
              </Card>
        </Col>
        </Row>
      );
    };
export default Grove;
