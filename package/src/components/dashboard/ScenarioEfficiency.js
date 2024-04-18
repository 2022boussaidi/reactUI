import React, { useEffect, useState } from "react";
import axios from "axios";
import Bar from "react-apexcharts";

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

  let data = null;

  if (scenarios.length > 0) {
    // Calculate global performance and availability
    const totalScenarios = scenarios.length;
    let totalMinPerformance = 0;
    let totalMaxPerformance = 0;
    let totalMinAvailability = 0;
    let totalMaxAvailability = 0;

    scenarios.forEach((scenario) => {
      totalMinPerformance += scenarios.map((scenario) => scenario.slaThreshold.performance.min);
      totalMaxPerformance += scenarios.map((scenario) => scenario.slaThreshold.performance.max);
      totalMinAvailability += scenarios.map((scenario) => scenario.slaThreshold.availability.min);
      totalMaxAvailability += scenario.slaThreshold.availability.max;
    });

    const globalMinPerformance = totalMinPerformance / totalScenarios;
    const globalMaxPerformance = totalMaxPerformance / totalScenarios;
    const globalMinAvailability = totalMinAvailability / totalScenarios;
    const globalMaxAvailability = totalMaxAvailability / totalScenarios;

    // Now you have globalMinPerformance, globalMaxPerformance, globalMinAvailability, and globalMaxAvailability
    // You can display them as a chart with range bars or error bars

    data = {
      labels: ['Performance', 'Availability'],
      datasets: [
        {
          label: 'Global Metrics',
          data: [
            { x: 'Performance', y: globalMinPerformance, yMax: globalMaxPerformance },
            { x: 'Availability', y: globalMinAvailability, yMax: globalMaxAvailability },
          ],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div>
      <h2>Global Performance and Availability</h2>
      {data && (
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                type: 'linear',
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}
