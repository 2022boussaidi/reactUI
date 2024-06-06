import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

function ErrorWarnCounts() {
  const [warnCount, setWarnCount] = useState(0);
  const [errCount, setErrCount] = useState(0);

  useEffect(() => {
    // Fetch prediction for WARN log level
    fetch('http://localhost:5000/predict-count?log_level=WARN&steps=1')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setWarnCount(data[0].predict);
        }
      })
      .catch(error => console.error('Error fetching WARN predictions:', error));

    // Fetch prediction for ERR log level
    fetch('http://localhost:5000/predict-count?log_level=ERR&steps=1')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setErrCount(data[0].predict);
        }
      })
      .catch(error => console.error('Error fetching ERR predictions:', error));
  }, []);

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // ApexCharts configuration
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      categories: ['WARN', 'ERR'],
      title: {
        text: 'Log Levels'
      }
    },
    yaxis: {
      title: {
        text: 'Predicted Count'
      }
    },
    legend: {
      position: 'top'
    }
  };

  const series = [
    {
      name: 'Predicted Count',
      data: [warnCount, errCount]
    }
  ];

  return (
    <div>
      <Row >
        <Col>
          <Card>
            <CardBody>
              <h4>Error_Warn_Counts</h4>
              <p className="mb-4 text-muted">This chart displays the predicted counts of ERR and WARN log levels for the next day starting from {currentDate}.</p>
              <Chart options={chartOptions} series={series} type="bar" height={350} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ErrorWarnCounts;
