import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/companies');
        setCompanies(response.data);
      } catch (err) {
        setError('Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">{error}</div>;

  return (
    <Container>
      <h1 className="my-4 text-center">Companies</h1>
      <Row>
        {companies.map(company => (
          <Col md={4} key={company.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Text>Location: {company.location}</Card.Text>
                <Card.Text>{company.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CompaniesPage;
