import { Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesChart = () => {


  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await axios.get("http://localhost:8080/projects");
      setProjects(result.data);
      setLoading(false); // Set loading to false when data is available
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };
     // Render a loading indicator while data is being fetched
  if (loading) {
    return <p>Loading project data...</p>;
  }

  // Check if projects is empty
  if (projects.length === 0) {
    return <p>No project data available.</p>;
  }

  // Extract project names, performance scores, and progress percentages
  const projectNames = projects.map((project) => project.name);
  const performanceScores = projects.map((project) => project.performanceScore);
  const progressPercentages = projects.map((project) => project.progressPercentage);

  const chartoptions = {
    series: [
      {
        name: "Performane score",
        data: performanceScores,
      },
      {
        name: "Progress percentage",
        data: progressPercentages,

      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
         categories: projectNames,
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Project evaluation</CardTitle>
        
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
