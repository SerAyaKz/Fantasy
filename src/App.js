import React, { useState } from 'react';
import './App.css';
import { Hero, Heart, Momon, OnePiece, Sound, Story1, Story2, Story3, Story4, Glitch, Eternity } from './assets';
import {Storybook, Star} from './components';
import { REDIRECT_OPTIONS, COMPUTER_OPTIONS, CONTENT_OPTIONS, ETERNITY_OPTION, STAR_OPTION, ALL_PROMPTS } from "./constants";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [content, setContent] = useState(null);
  const [isStorybookOpen, setStorybookOpen] = useState(false);
  const [storybookPages, setStorybookPages] = useState([]);
  const [clickEternity, setClickEternity] = useState(0);
  const [clickStar, setClickStar] = useState(0);
  const [stars, setStars] = useState([]); 
  const [revealedText, setRevealedText] = useState('');

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
          window.open(Eternity, '_blank'); 
          return 0; 
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
      setStars([]); 
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
    const numStars = Math.floor(Math.random() * 4) + 5; 
    const newStars = [];

    for (let i = 0; i < numStars; i++) {
      const starPosition = {
        x: Math.random() * window.innerWidth, 
        y: Math.random() * window.innerHeight 
      };
      newStars.push(starPosition); 
    }

    setStars(prevStars => [...prevStars, ...newStars]); 
  };

  const handleScreenClick = (e) => {
    const { clientX, clientY, target } = e;

    if (clientX < window.innerWidth * 0.2 || clientY > window.innerHeight * 0.8) {
      setRevealedText(`You discovered the secret at the bottom!\n${ALL_PROMPTS.map(prompt => prompt.toUpperCase()).join(', ')}`);

    } else {
      setRevealedText(''); 
    }
  };

  return (
    <div className="App" onClick={handleScreenClick}>
      <div className="hero-container">
        <img src={Hero} className="nice-gif" alt="Hero" />
        <div className="content-overlay">
          {content}
          {revealedText && <div className="revealed-text">{revealedText}</div>}
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
