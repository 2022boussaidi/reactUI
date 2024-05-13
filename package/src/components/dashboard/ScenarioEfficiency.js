import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Card, CardBody } from "reactstrap";

export default function PScenarioEfficiency() {
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

    // Divide the chart into 4 segments
    data = [
      { name: 'globalMinPerformance', value: globalMinPerformance},
      { name: 'globalMaxPerformance', value: globalMaxPerformance},
      { name: 'globalMinAvailability', value:  globalMinAvailability},
      { name: 'globalMaxAvailability ', value:  globalMaxAvailability },
    ];
  }

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  return (
    <div>
      <Card>
        <CardBody>
          <h5>Global Performance and Availability</h5>
          <PieChart width={450} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text x={x} y={y} fill={COLORS[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {data[index].name}
                  </text>
                );
              }}
            >
              {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardBody>
      </Card>
    </div>
  );
}
