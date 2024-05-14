import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, CardBody, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Error = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/error");
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
    const parsedData = buckets.flatMap(bucket3 => 
      bucket3["3"].buckets.map(bucket4 => ({
        site: bucket3.key,
        robot: bucket4.key,
        severity: bucket4["4"].buckets.map(b => b.key).join(', '),
        count: bucket4.doc_count
      }))
    );
    return parsedData;
  };

  const handleClick = (page, event) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <Card>
        <CardBody>
          <h4>Ekara Robot Top Error Count</h4>
          <Table bordered>
            <thead>
              <tr>
                <th>Ekara_Site_Agent</th>
                <th>Ekara_Robot</th>
                <th>Robot_Severity</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td>{item.site}</td>
                  <td>{item.robot}</td>
                  <td>{item.severity}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <PaginationItem disabled={currentPage <= 1}>
              <PaginationLink
                onClick={(e) => handleClick(currentPage - 1, e)}
                previous
                href="#"
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem active={i + 1 === currentPage} key={i}>
                <PaginationLink onClick={(e) => handleClick(i + 1, e)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage >= totalPages}>
              <PaginationLink
                onClick={(e) => handleClick(currentPage + 1, e)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </div>
  );
};

export default Error;
