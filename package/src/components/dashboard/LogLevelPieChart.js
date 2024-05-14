import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Card, CardBody } from 'reactstrap';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const LogLevelPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/count_logs");
      const apiData = response.data;
      if (apiData) {
        const parsedData = parseData(apiData);
        setData(parsedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const parseData = (apiData) => {
    const buckets = apiData.aggregations["2"].buckets;
    return buckets.map(bucket => ({
      name: bucket.key,
      value: bucket.doc_count
    }));
  };

  return (
    <div>
      <Card>
        <CardBody>
          <h4>Log-level Pie Chart</h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
};

export default LogLevelPieChart;
