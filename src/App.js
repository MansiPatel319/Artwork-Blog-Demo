import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Page/HomePage';
import BlogDetailPage from './Page/BlogDtailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;