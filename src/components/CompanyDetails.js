import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For getting the id from the URL
import axios from 'axios';

const CompanyDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/companies/${id}`);
        setCompany(response.data);
      } catch (error) {
        setError('Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Company Details</h1>
      {company && (
        <div>
          <h3>{company.name}</h3>
          <p><strong>Industry:</strong> {company.industry}</p>
          <p><strong>Website:</strong> {company.website}</p>
          <p><strong>Phone:</strong> {company.phone}</p>
          {/* Add any other company details you want */}
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
