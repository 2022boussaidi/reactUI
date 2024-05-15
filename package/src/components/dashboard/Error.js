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
      const response = await axios.post("http://localhost:5001/api/error");
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
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <Card>
        <CardBody>
          <h4>Ekara_Robot_Top_Error_Count</h4>
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
            first
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(1);
            }}
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink
            previous
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(currentPage - 1);
            }}
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage >= totalPages}>
          <PaginationLink
            next
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(currentPage + 1);
            }}
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage >= totalPages}>
          <PaginationLink
            last
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(totalPages);
            }}
          />
        </PaginationItem>
      </Pagination>
        </CardBody>
      </Card>
    </div>
  );
};

export default Error;
