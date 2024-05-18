import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Card, CardBody } from "reactstrap";

function CPUUtilization() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/cloudwatch/metrics')
      .then(response => {
        setMetrics(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const options = {
    chart: {
      type: 'line',
      height: 400,
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      categories: metrics.map(metric => metric.Timestamp),
    },
    yaxis: {
      title: {
        text: 'Percent',
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
      name: 'Minimum',
      data: metrics.map(metric => metric.Minimum),
    },
    {
      name: 'Maximum',
      data: metrics.map(metric => metric.Maximum),
    }
  ];

  return (
    <div>
      <Card>
        <CardBody>
          <h5>CPUUtilization</h5>
          <Chart options={options} series={series} type="line" height={400} />
        </CardBody>
      </Card>
    </div>
  );
}

export default CPUUtilization;
