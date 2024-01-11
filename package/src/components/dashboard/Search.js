import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ServiceProposals.css'; // Ensure this CSS file is linked

// Import images
import oilImage from '../../assets/images/users/oil.jpg';
import packagingImage from '../../assets/images/users/dabouza.jpg';
import extractionImage from '../../assets/images/users/war9a.jpg';

const ServiceProposals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    typeOfExtraction: '',
    minPrice: '',
    maxPrice: '',
  });

  const services = [
    {
      name: 'Analysis',
      price: '499',
      description: 'We offer you different analysis to prove the quality of your oil',
      rating: 4,
      imageUrl: oilImage,
      country: 'Country A',
      typeOfExtraction: 'Type A',
    },
    {
      name: 'Oil Packaging',
      price: '499',
      description: 'The best conditions for packaging your oil',
      rating: 5,
      imageUrl: packagingImage,
      country: 'Country B',
      typeOfExtraction: 'Type B',
    },
    {
      name: 'Olive Extraction',
      price: '299',
      description: 'Modern olive extraction processes',
      rating: 4,
      imageUrl: extractionImage,
      country: 'Country C',
      typeOfExtraction: 'Type C',
    },
    // Add more services as needed...
    // Example:
    {
      name: 'Service Name 4',
      price: '599',
      description: 'Description for Service 4',
      rating: 3,
      imageUrl: extractionImage,
      country: 'Country D',
      typeOfExtraction: 'Type D',
    },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    // Apply filters logic here
    console.log('Filters:', filters);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <div className="service-proposals">
        <div className="filters">
          <Form onSubmit={handleFilterSubmit}>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group controlId="formTypeOfExtraction">
              <Form.Label>Type of Extraction</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type of extraction"
                name="typeOfExtraction"
                value={filters.typeOfExtraction}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group controlId="formMinPrice">
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter min price"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group controlId="formMaxPrice">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter max price"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Apply Filters
            </Button>
          </Form>
        </div>
        <div className="proposals">
          <h2>Service Proposals</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Row>
            {filteredServices.map((service) => (
              <Col sm={6} md={4} lg={4} key={service.name}>
                <Card className="proposal-item">
                  <Card.Img variant="top" src={service.imageUrl} />
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    <Card.Text className="price">${service.price}/unit</Card.Text>
                    <Card.Text>{service.description}</Card.Text>
                    {/* Render rating stars */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default ServiceProposals;
