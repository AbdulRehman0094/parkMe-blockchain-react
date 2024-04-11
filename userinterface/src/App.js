import './App.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import AddParking from './screens/AddParking';
import LoginParking from './screens/LoginParking';
import ParkingArea from './screens/ParkingArea';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/addparking' element={<AddParking/>}/>
        <Route path='/loginparking' element={<LoginParking/>}/>
        <Route path='/parkingarea' element={<ParkingArea/>}/>

      </Routes>
    </Router>
  );
}

export default App;
