// src/components/Storybook.js
import React from 'react';
import Slider from 'react-slick';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './style.css';  // Ensure this CSS file is created for styling

const Storybook = ({ pages, isOpen, onClose }) => {
  if (!isOpen || !pages || pages.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="storybook-overlay">
      <div className="storybook-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={0}
          defaultPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="zoom-controls">
                <button className="zoom-btn" onClick={zoomIn}>Zoom In</button>
                <button className="zoom-btn" onClick={zoomOut}>Zoom Out</button>
                <button className="zoom-btn" onClick={resetTransform}>Reset</button>
              </div>
              <TransformComponent>
                <Slider {...settings}>
                  {pages.map((page, index) => (
                    <div key={index} className="slide">
                      <img src={page[`Story${index + 1}`]} alt={`Page ${index + 1}`} className="storybook-image" />
                    </div>
                  ))}
                </Slider>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
};

export default Storybook;