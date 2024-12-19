import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, FormControl } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';
const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using "users" as mock company data
        const companiesResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        setCompanies(companiesResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter companies based on search query
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.company.name.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming company data has a company name
  );

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">{error}</div>;

  return (
    <Container>
      <h1 className="my-4 text-center">Companies</h1>

      {/* Search input for filtering */}
      <Row className="mb-4">
        <Col>
          <FormControl
            type="text"
            placeholder="Search by company name or catchphrase"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      <Row>
        {filteredCompanies.map(company => (
          <Col key={company.id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Text>{company.company.name}</Card.Text> {/* Company name nested in "company" object */}
                <Card.Text>{company.email}</Card.Text>
                <Card.Text>{company.address.city}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CompaniesPage;
