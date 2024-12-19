import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/./Home';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import CompaniesPage from './pages/CompaniesPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
