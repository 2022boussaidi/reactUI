import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardBody } from 'reactstrap';


const parseErrorData = (data) => {
    return data.aggregations["2"].buckets.map(bucket => {
      const warnBucket = bucket["3"].buckets.find(b => b.key === "WARN");
      const errBucket = bucket["3"].buckets.find(b => b.key === "ERR");
  
      return {
        timestamp: bucket.key_as_string,
        WARN: warnBucket ? warnBucket.doc_count : 0,
        ERR: errBucket ? errBucket.doc_count : 0
      };
    });
  }
/***************************error_line_chart************************* */

const ErrorLineChart = () => {
  const [errorData, setErrorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/api/error_by_time');
        const parsedData = parseErrorData(response.data);
        setErrorData(parsedData);
      } catch (error) {
        console.error('Error fetching error data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
     <CardBody>
      <h4>Ekara_Node_Robot_Error_by_Time</h4>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={600}
        height={300}
        data={errorData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="WARN"  stroke="#8884d8"  strokeWidth={3}activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="ERR"  strokeWidth={3} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </CardBody> 
    </Card>
  );
};

export default ErrorLineChart;
