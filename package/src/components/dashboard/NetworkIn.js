import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardBody } from "reactstrap";

function NetworkIn() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4003/NetworkIn')
      .then(response => {
        setMetrics(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const formatYAxis = (tick) => {
    if (tick >= 1000000) {
      return `${(tick / 1000000).toFixed(2)} MB`;
    } else if (tick >= 1000) {
      return `${(tick / 1000).toFixed(2)} KB`;
    }
    return `${tick} Bytes`;
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h5>NetworkIn</h5>
          <LineChart width={550} height={400} data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Timestamp" />
            <YAxis label={{ value: 'Bytes', angle: -90, position: 'insideLeft' }} tickFormatter={formatYAxis} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Average" stroke="green" />
            <Line type="monotone" dataKey="Maximum" stroke="red" />
            <Line type="monotone" dataKey="Minimum" stroke="violet" />


            {/* Add more lines if needed for other metrics */}
          </LineChart>
        </CardBody>
      </Card>
    </div>
  );
}

export default NetworkIn;
