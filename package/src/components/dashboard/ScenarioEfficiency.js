import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardBody } from "reactstrap";

export default function ScenarioEfficinecy() {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8080/scenarios",
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      setScenarios(response.data);
    } catch (error) {
      console.error("Error loading scenarios:", error);
    }
  };

  let data = [];

  if (scenarios.length > 0) {
    const totalScenarios = scenarios.length;
    let totalMinPerformance = 0;
    let totalMaxPerformance = 0;
    let totalMinAvailability = 0;
    let totalMaxAvailability = 0;

    scenarios.forEach((scenario) => {
      totalMinPerformance += scenario.slaThreshold.performance.min;
      totalMaxPerformance += scenario.slaThreshold.performance.max;
      totalMinAvailability += scenario.slaThreshold.availability.min;
      totalMaxAvailability += scenario.slaThreshold.availability.max;
    });

    const globalMinPerformance = totalMinPerformance / totalScenarios;
    const globalMaxPerformance = totalMaxPerformance / totalScenarios;
    const globalMinAvailability = totalMinAvailability / totalScenarios;
    const globalMaxAvailability = totalMaxAvailability / totalScenarios;

    data = [
      { name: 'Performance', min: globalMinPerformance, max: globalMaxPerformance },
      { name: 'Availability', min: globalMinAvailability, max: globalMaxAvailability },
    ];
  }

  return (
    <div>
      <Card>
        <CardBody>
      <h5>Global Performance and Availability</h5>
      <BarChart
        width={1250}
        height={400}
        data={data}
        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="min" fill="rgba(255, 162, 200, 0.7)" />
        <Bar dataKey="max" fill="rgba(54, 162, 150, 0.7)" />
      </BarChart>
      </CardBody>
      </Card>
    </div>
  );
}
