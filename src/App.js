import React, { useState } from "react";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <div className="overlay">
        <div className="App" style={{ textAlign: "center", paddingTop: "50px" }}>
          <h1 style={{ color: "#1db954" }}>🎵 React Music Player</h1>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}

export default App;
