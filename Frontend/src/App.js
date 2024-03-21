import React, { useState } from 'react';

import './styles/App.css';
import './styles/login.css';
import './styles/zero.css';
import  Login from './components/login/Login'
import  HomePage from './components/HomePage/HomePage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/homepage-1" element = {<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
