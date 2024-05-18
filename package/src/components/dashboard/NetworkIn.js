import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Card, CardBody } from "reactstrap";

function NetworkIn() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/cloudwacth/NetworkIn')
      .then(response => {
        setMetrics(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} MB`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} KB`;
    }
    return `${value} Bytes`;
  };

  const options = {
    chart: {
      type: 'line',
      height: 400,
    },
    xaxis: {
      categories: metrics.map(metric => metric.Timestamp),
    },
    yaxis: {
      labels: {
        formatter: formatYAxis,
      },
      title: {
        text: 'Bytes',
        rotate: -90,
        offsetX: -10,
        offsetY: -15,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: 'Arial',
        }
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      position: 'top'
    },
    colors: ['#007bff', '#dc3545', '#fd7e14'] // Change colors here
  };

  const series = [
    {
      name: 'Average',
      data: metrics.map(metric => metric.Average),
    },
    {
      name: 'Maximum',
      data: metrics.map(metric => metric.Maximum),
    },
    {
      name: 'Minimum',
      data: metrics.map(metric => metric.Minimum),
    }
  ];

  return (
    <div>
      <Card>
        <CardBody>
          <h5>NetworkIn</h5>
          <Chart options={options} series={series} type="line" height={400} />
        </CardBody>
      </Card>
    </div>
  );
}

export default NetworkIn;
