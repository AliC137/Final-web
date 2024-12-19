import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For getting the id from the URL
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>User Details</h1>
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          {/* Add any other user details you want */}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
