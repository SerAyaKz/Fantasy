import React, { useState } from 'react';
import './App.css';
import { Hero, Heart, Momon, OnePiece, Sound, Story1, Story2, Story3, Story4, Glitch, Eternity } from './assets';
import Storybook from './components/Storybook';
import { REDIRECT_OPTIONS, COMPUTER_OPTIONS, CONTENT_OPTIONS, ETERNITY_OPTION, STAR_OPTION } from "./constants";
import Star from './components/Star'; // Import the Star component

function App() {
  const [inputValue, setInputValue] = useState('');
  const [content, setContent] = useState(null);
  const [isStorybookOpen, setStorybookOpen] = useState(false);
  const [storybookPages, setStorybookPages] = useState([]);
  const [clickEternity, setClickEternity] = useState(0);
  const [clickStar, setClickStar] = useState(0);
  const [stars, setStars] = useState([]); // State to hold stars

  const handleRedirect = () => {
    const matchedOption = REDIRECT_OPTIONS.find(option => option.prompt === inputValue.toUpperCase());
    if (matchedOption) {
      window.open(matchedOption.link, '_blank');
    } else if (COMPUTER_OPTIONS.includes(inputValue.toLowerCase())) {
      handleContentDisplay(inputValue);
    } else if (CONTENT_OPTIONS.includes(inputValue.toLowerCase())) {
      setContent(null);
      handleStorybookContent(inputValue.toLowerCase());
    } else if(inputValue.toLowerCase()==ETERNITY_OPTION){
      setContent(null);
      setStorybookOpen(false);
      setClickStar(0);
      setClickEternity(prev => {
        const newCount = prev + 1;
        if (newCount === 3) {
          window.open(Eternity, '_blank'); // Open Heart GIF in a new tab
          return 0; // Reset count after opening
        }
        return newCount;
      });
    }
    else if(inputValue.toLowerCase()==STAR_OPTION){
      setContent(null);
      setStorybookOpen(false);
      setClickEternity(0);
      setClickStar(prev => {
        const newCount = prev + 1;
        if (newCount <= 5) {
          addStars(newCount);
        }
        return newCount;
      });
    }
    else{
      setContent(null);
      setStorybookOpen(false);
      setClickEternity(0);
      setClickStar(0);
      setStars([]); // Reset stars when input is invalid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRedirect();
  };

  const handleContentDisplay = (input) => {
    switch (input.toLowerCase()) {
      case 'enchantment':
        setContent(
          <div className="animation-content">
            <img src={Heart} className="animation-gif" alt="Heart" />
          </div>
        );
        break;
      case 'rune':
        setContent(
          <div className="text-content">
            <p>OK, I see you now. Coming up from behind</p>
          </div>
        );
        break;
      case 'vision':
        setContent(
          <div className="video-content">
            <video controls autoPlay>
              <source src={Momon} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
        break;
      case 'echoes':
        setContent(
          <div className="audio-content">
            <img src={Sound} className="nice-gif" alt="Sound" />
            <audio controls autoPlay>
              <source src={OnePiece} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
        break;
      default:
        setContent(null);
        break;
    }
  };

  const handleStorybookContent = (input) => {
    switch (input) {
      case 'tales':
        setStorybookPages([
          {Story1},
          {Story2},
          {Story3},
          {Story4}
        ]);
        break;
      case 'glitch':
        setStorybookPages([
          {Glitch}
        ]);
        break;
      default:
        setStorybookPages([]);
        break;
    }
    setStorybookOpen(true);
  };

  const handleCloseStorybook = () => {
    setStorybookOpen(false);
  };

  const addStars = (clickCount) => {
    const numStars = Math.floor(Math.random() * 4) + 5; // Random number of stars between 2 and 5
    const newStars = [];

    for (let i = 0; i < numStars; i++) {
      const starPosition = {
        x: Math.random() * window.innerWidth, // Random x position
        y: Math.random() * window.innerHeight // Random y position
      };
      newStars.push(starPosition); // Add new star position
    }

    setStars(prevStars => [...prevStars, ...newStars]); // Add new stars to the existing array
  };


  return (
    <div className="App">
      <div className="hero-container">
        <img src={Hero} className="nice-gif" alt="Hero" />
        <div className="content-overlay">
          {content}
         
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="overlay-input"
            placeholder="?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="submit-button"></button>
        </form>
        <Storybook pages={storybookPages} isOpen={isStorybookOpen} onClose={handleCloseStorybook} />
      </div>
      {stars.map((position, index) => (
            <Star key={index} position={position} />
          ))}
    </div>
  );
}

export default App;
