import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';

const DesktopConsumption = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(
        "http://localhost:8080/consumption",
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );
      const apiData = response.data.consumption.find(series => series.name === "DESKTOP");
      if (apiData) {
        const formattedData = apiData.data.map(item => ({ x: item.x, y: item.y }));
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return (
    <div>
        <Card>
            <CardBody>
     
      <AreaChart width={850} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="y" stackId="1" name="DESKTOP" fill="#ffc658" />
      </AreaChart>
      </CardBody>
      </Card>
    </div>
  );
};

export default DesktopConsumption;
