import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {Hero} from './images'; 

function App() {
  
  return (
    <div className="App">
      <div className="hero-container">
        <img src={Hero} className="hero-gif" alt="Hero" />
        <input type="text" className="overlay-input" placeholder="?" />
      </div>
    </div>
    
  );
}

export default App;
