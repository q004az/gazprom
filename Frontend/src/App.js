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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
