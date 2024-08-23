// Star.js
import React from 'react';
import './Star.css'; // Create a CSS file for styling the star

const Star = ({ position }) => {
  return (
    <div className="star" style={{ left: position.x, top: position.y }}></div>
  );
};

export default Star;