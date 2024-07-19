import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/pathfindingVisualizer';
import WelcomePopup from './components/WelcomePopup';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
function App() {

  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // const [darkMode, setDarkMode] = useState(() => {
  //   const savedTheme = localStorage.getItem('darkMode');
  //   return savedTheme ? JSON.parse(savedTheme) : false;
  // });

  // useEffect(() => {
  //   localStorage.setItem('darkMode', darkMode);
  // }, [darkMode]);

  // const toggleDarkMode = () => {
  //   setDarkMode(prevMode => !prevMode);
  // };


  return (
    <div className={`App `}>
      {/* ${darkMode ? 'dark-mode' : 'light-mode'} inside above className*/}
      {/* <button className="toggle-button" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button> */}
      {showPopup && <WelcomePopup onClose={handleClosePopup} />}
      {!showPopup && <PathfindingVisualizer />}
    </div>
  );
}

export default App;