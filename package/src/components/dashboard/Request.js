import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Select from "react-select";

const Request = () => {
  const requestTypes = [
    {
      value: 1,
      label: "Extraction Request",
    },
    {
      value: 2,
      label: "Packaging Request",
    },
    {
      value: 3,
      label: "Analysis Request",
    },
    {
      value: 4,
      label: "Storage Request",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    if (selectedOption) {
      const newItem = {
        id: selectedItems.length + 1,
        name: selectedOption.label,
      };

      setSelectedItems([...selectedItems, newItem]);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
    }),
  };

  return (
    <Row style={{ marginLeft: "10px", marginRight: "5px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>Home /</div>
        <div style={{ color: "black", marginLeft: "8px" }}>Create Request</div>
      </div>
      <div style={{ color: "black", marginLeft: "8px" }}>Create Request</div>

      <Card>
        <CardBody>
          <div>
            <div style={{ borderBottom: "1px solid black", paddingBottom: "8px" }}>
              Request Type
            </div>
          </div>
          <div style={{ paddingTop: "8px" }}>
            <Select
              placeholder="Request Type"
              value={selectedOption}
              options={requestTypes}
              onChange={handleChange}
              styles={customStyles}
            />

            
          </div>
        </CardBody>
      </Card>

      <Row style={{ marginTop: "20px" }}>
        <Col md={6}>
          <Card>
            <CardBody>
              <div style={{ paddingTop: "100px", paddingBottom: "100px", marginLeft: "150px", marginRight: "50px" }}>
                Select your request type...!
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <CardBody>
              <div>
                <div>
                  Your Requests
                </div>
              </div>
              <div style={{ paddingTop: "8px" }}>
                <table className="my-table">
                  <thead>
                    <tr>
                      <th style={{ marginRight: "50px" }}> Request ID</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Row>
  );
};

export default Request;
