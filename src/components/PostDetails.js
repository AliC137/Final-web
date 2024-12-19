import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For getting the id from the URL
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError('Failed to fetch post data');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Post Details</h1>
      {post && (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p><strong>Author:</strong> {post.author}</p>
          {/* Add any other post details you want */}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
