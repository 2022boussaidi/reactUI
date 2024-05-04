import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import ApiConsumption from "../components/consumption/ApiConsumption";
import DesktopConsumption from "../components/consumption/DesktopConsumption";
import BrowserConsumption from "../components/consumption/BrowserConsumption";
import HttpConsumption from "../components/consumption/HttpConsumption";
import AndroidConsumption from "../components/consumption/AndroidConsumption";
import IphoneConsumption from "../components/consumption/IphoneConsumption";
import WebConsumption from "../components/consumption/WebConsumption";

const consumptionMetrics = [
  { id: 1, name: "API", component: <ApiConsumption /> },
  { id: 2, name: "Desktop", component: <DesktopConsumption /> },
  { id: 3, name: "Browser", component: <BrowserConsumption /> },
  { id: 4, name: "HTTP", component: <HttpConsumption /> },
  { id: 5, name: "Android", component: <AndroidConsumption /> },
  { id: 6, name: "iPhone", component: <IphoneConsumption /> },
  { id: 7, name: "Web", component: <WebConsumption /> }
];

const DataConsumption = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const handleMetricClick = (id) => {
    setSelectedMetric((prevId) => (prevId === id ? null : id));
  };

  const handlePageClick = (event) => {
    if (!event.target.closest(".metric-item")) {
      setSelectedMetric(null);
    }
  };

  return (
    <div onClick={handlePageClick}>
      <h4>Data consumption</h4>
      {/* List of Consumption Metrics */}
      <Row>
        <Col sm="2" lg="2" xl="2" xxl="2">
          <ListGroup>
            {consumptionMetrics.map((metric) => (
              <ListGroupItem
                key={metric.id}
                onClick={() => handleMetricClick(metric.id)}
                active={selectedMetric === metric.id}
                style={{ cursor: "pointer" }}
                className="metric-item"
              >
                {metric.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        {/* Display selected consumption metric's component */}
        <Col sm="9" lg="9" xl="9" xxl="9">
          {selectedMetric ? (
            consumptionMetrics.map((metric) =>
              metric.id === selectedMetric ? (
                <div key={metric.id}>{metric.component}</div>
              ) : null
            )
          ) : (
            // If no consumption metric is selected, display all components
            consumptionMetrics.map((metric) => (
              <div key={metric.id}>{metric.component}</div>
            ))
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DataConsumption;
