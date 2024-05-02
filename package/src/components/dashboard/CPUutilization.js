import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardBody } from "reactstrap";



function CPUUtilization() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/metrics')
      .then(response => {
        setMetrics(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Card>
      <CardBody>
     
      
      <h5>CPUUtilization</h5>
      <LineChart width={550} height={400} data={metrics}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Timestamp" />
        <YAxis label={{ value: 'Percent', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Average" stroke="green" />
        <Line type="monotone" dataKey="Minimum" stroke="red" />
        <Line type="monotone" dataKey="Maximum" stroke="orange" />
        {/* Add more lines if needed for other metrics */}
      </LineChart></CardBody>

      </Card>
    </div>
  );
}

export default CPUUtilization;
