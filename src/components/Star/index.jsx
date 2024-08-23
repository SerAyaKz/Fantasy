import React from 'react';
import './Star.css'; 

const Star = ({ position }) => {
  return (
    <div className="star" style={{ left: position.x, top: position.y }}></div>
  );
};

export default Star;