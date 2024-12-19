import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, FormControl } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(usersResponse.data);
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

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toString().includes(searchQuery)
  );

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">{error}</div>;

  return (
    <Container>
      <h1 className="my-4 text-center">Users</h1>

      {/* Search input for filtering */}
      <Row className="mb-4">
        <Col>
          <FormControl
            type="text"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      <Row>
        {filteredUsers.map(user => (
          <Col key={user.id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Username: {user.username}</Card.Text>
                <Card.Text>Phone: {user.phone}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UsersPage;
