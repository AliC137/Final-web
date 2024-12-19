import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Function to handle category selection and navigate to respective page
  const handleCategorySelect = (category) => {
    navigate(`/${category}`); // Redirects to /users, /posts, or /companies
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Welcome to the Home Page</h1>

      {/* Dropdown for selecting different categories */}
      <Row className="mb-4">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCategorySelect('users')}>Users</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect('companies')}>Companies</Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategorySelect('posts')}>Posts</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
