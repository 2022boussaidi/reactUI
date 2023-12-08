import React, { useState } from "react";
import TopCards from "../dashboard/TopCards";
import { Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Card, CardBody } from "reactstrap";
import { useTable, usePagination } from "react-table";
import { Link, useLocation } from "react-router-dom";

const Mygoods = () => {
  const data = [
    { good: "4782123-chaal", type: "oil", date: "2023-01-01", initialQuantity: "100 L", remainingQuantity: "8 L", creationCause: "45221" },
    { good: "4782123-chaal", type: "oil", date: "2023-01-01", initialQuantity: "100 L", remainingQuantity: "8 L", creationCause: "45221" },
    { good: "4782123-chaal", type: "oil", date: "2023-01-01", initialQuantity: "100 L", remainingQuantity: "8 L", creationCause: "45221" },
    { good: "4782123-chaal", type: "oil", date: "2023-01-01", initialQuantity: "100 L", remainingQuantity: "8 L", creationCause: "45221" },
    { good: "4782123-chaal", type: "oil", date: "2023-01-01", initialQuantity: "100 L", remainingQuantity: "8 L", creationCause: "45221" }
  ];

  const columns = [
    { Header: "Good", accessor: "good" },
    { Header: "Type", accessor: "type" },
    { Header: "Date", accessor: "date" },
    { Header: "Initial Quantity", accessor: "initialQuantity" },
    { Header: "Remaining Quantity", accessor: "remainingQuantity" },
    {
      Header: "Creation Cause",
      accessor: "creationCause",
      Cell: ({ row }) => <DropdownCell row={row} />,
    },
  ];

  const DropdownCell = ({ row }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen((prevState) => !prevState);
    };

    const handleOptionClick = (option) => {
      console.log(`Selected option '${option}' for item with id ${row.original.id}`);
      setDropdownOpen(false);
    };

    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} style={{ marginLeft: "200px"  }}>
        <DropdownToggle caret>
          <i className="bi bi-three-dots"></i> 
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleOptionClick("Edit")}>Edit</DropdownItem>
          <DropdownItem onClick={() => handleOptionClick("Details")}>Details</DropdownItem>
          <DropdownItem onClick={() => handleOptionClick("Track")}>Track</DropdownItem>
          <DropdownItem onClick={() => handleOptionClick("Action")}>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  const handleCreateGroveClick = () => {
    console.log("Create Grove clicked");
  };

  const handleCreateHarvestClick = () => {
    console.log("Create Harvest clicked");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable({ columns, data }, usePagination);

  return (
    <div>
      <h3>Dashboard</h3>
      <Row>
        <Col sm="4" lg="3">
          <TopCards subtitle="Total groves " earning="123" />
        </Col>
        <Col sm="4" lg="3">
          <TopCards subtitle="Total harvests" earning="123" />
        </Col>
        <Col sm="4" lg="3">
          <TopCards subtitle="Total oil products" earning="123" />
        </Col>
      </Row>
      <div className="d-flex justify-content-between align-items-center" style={{ fontSize: 18, fontWeight: "bold", marginBottom: "20px" }}>
        <span>Goods</span>
        <span>
          <Link style={{ marginLeft: "5px", color: "blue", fontSize: 15, fontWeight: "bold" }}>Add New Good</Link>
        </span>
      </div>
      <Card>
        <CardBody>
          <div className="py-4">
            <table className="table table-bordered table-hover" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                Previous Page
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                Next Page
              </button>{" "}
            </div>
            <div style={{ marginLeft: "100px" }}>
            <Link className="btn btn-outline-blue mx-2"  to="/grove" >
                                      Create grove 
                          </Link>
                          <Link className="btn btn-outline-blue mx-2" to = "/harvest">
                                      Create harvest
                          </Link>            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Mygoods;
