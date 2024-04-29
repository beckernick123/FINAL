import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import CreateNewPost from "./components/CreateNewPost"; // Make sure to import the CreateNewPost component
import supabase from './supabaseClient';
import './index.css';
import Header from './style/Header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create-post" element={<CreateNewPost />} /> {/* New route for creating posts */}
      </Routes>
    </Router>
  );
}

export default App;
