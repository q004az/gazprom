import React, { useState } from 'react';
import logo from "./icons/logo.svg";
import './styles/App.css';
import './styles/login.css';
import './styles/zero.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  Login from './components/login/Login'
import Register from './components/register/register'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
