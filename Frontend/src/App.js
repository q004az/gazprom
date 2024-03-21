import React, { useState } from 'react';
import './styles/App.css';
import './styles/login.css';
import './styles/zero.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  Login from './components/login/Login'
import Register from './components/register/register'
import Homepage from './components/homepage/Homepage'
import Audience1 from './components/Audience1/Audience1';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/Audience-1" element={<Audience1/>} />
          <Route path="/Audience-2" element={<Audience1/>} />
          <Route path="/Audience-3" element={<Audience1/>} />
          <Route path="/Audience-4" element={<Audience1/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
