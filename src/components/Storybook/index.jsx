import React, { useState } from 'react';
import './Storybook.css'; 

const Storybook = ({ pages, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3)); 
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 1)); 
  };

  const handleClose = () => {
    onClose();
    setCurrentPage(0); 
    setScale(1); 
  };
 
  return (
    <div className="storybook-overlay">
      <div className="storybook-content" style={{ transform: `scale(${scale})` }}>
        {pages.length > 2 && (
          <img src={pages[currentPage][`Story${currentPage + 1}`]} alt={`Story ${currentPage + 1}`} className="story-image" />
        )}
        {pages.length <= 1 && (
          <img src={pages[currentPage][`Glitch`]} alt={`Story ${currentPage + 1}`} className="story-image" />
        )}
        
      </div>
      <div className="storybook-controls">
          <div className="zoom-controls">
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="navigation-controls">
            <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
            <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>Next</button>
          </div>
        </div>
    </div>
  );
};

export default Storybook;