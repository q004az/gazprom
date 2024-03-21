import React, { useState } from 'react';
import './styles/App.css';
import './styles/login.css';
import './styles/zero.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  Login from './components/login/Login'
import Register from './components/register/register'
import Homepage from './components/homepage/Homepage'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/homepage-1" element={<Homepage/>} />
          <Route path="/homepage-2" element={<Homepage/>} />
          <Route path="/homepage-3" element={<Homepage/>} />
          <Route path="/homepage-4" element={<Homepage/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
