import React, { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";

const songs = [
{ title: "samba mapangala", url: "/songs/song1.mp3", genre: "Rumba" },
{ title: "opeta wa musungu", url: "/songs/song2.mp3", genre: "Local" },
{ title: "allan walker", url: "/songs/song3.mp3", genre: "Pop" },
{ title: "toja cat", url: "/songs/song4.mp3", genre: "Hip Hop" },
{ title: "nicki minaj", url: "/songs/song5.mp3", genre: "Bongo" },
{ title: "sapheena", url: "/songs/song6.mp3", genre: "Jazz" },
];

export default function MusicPlayer() {
const [currentTrack, setCurrentTrack] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [volume, setVolume] = useState(1);
const [playbackSpeed, setPlaybackSpeed] = useState(1);
const [searchQuery, setSearchQuery] = useState("");
const [selectedGenre, setSelectedGenre] = useState("All");
const [darkMode, setDarkMode] = useState(false);

const audioRef = useRef(null);

useEffect(() => {
if (audioRef.current) {
audioRef.current.volume = volume;
audioRef.current.playbackRate = playbackSpeed;
}
}, [volume, playbackSpeed]);

const togglePlay = () => {
if (isPlaying) {
audioRef.current.pause();
} else {
audioRef.current.play();
}
setIsPlaying(!isPlaying);
};

const filteredSongs = songs.filter(
(song) =>
song.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
(selectedGenre === "All" || song.genre === selectedGenre)
);

const nextTrack = () => {
const next = (filteredSongs.findIndex((s) => s === songs[currentTrack]) + 1) % filteredSongs.length;
setCurrentTrack(songs.indexOf(filteredSongs[next]));
setIsPlaying(true);
setTimeout(() => audioRef.current.play(), 0);
};

const prevTrack = () => {
const prev = (filteredSongs.findIndex((s) => s === songs[currentTrack]) - 1 + filteredSongs.length) % filteredSongs.length;
setCurrentTrack(songs.indexOf(filteredSongs[prev]));
setIsPlaying(true);
setTimeout(() => audioRef.current.play(), 0);
};

const genres = ["All", "Pop", "Jazz", "Rumba", "Hip Hop","Local", "Bongo"];

return (
<div className={`player-container ${darkMode ? "dark-mode" : "light-mode"}`}>

<button onClick={() => setDarkMode(!darkMode)} className="toggle-theme">
{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"} </button>
  <input
    type="text"
    className="search-input"
    placeholder="Search songs..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <div className="genre-buttons">
    {genres.map((g) => (
      <button
        key={g}
        onClick={() => setSelectedGenre(g)}
        className={`genre-button ${selectedGenre === g ? "active" : ""}`}
      >
        {g}
      </button>
    ))}
  </div>

  <h2 className="track-title">{songs[currentTrack].title}</h2>
  <audio
    ref={audioRef}
    src={songs[currentTrack].url}
    autoPlay={isPlaying}
    controls
  />

  <div className="controls">
    <button onClick={prevTrack}>⏮️</button>
    <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
    <button onClick={nextTrack}>⏭️</button>
  </div>

  <div className="slider-group">
    <label>
      Volume:
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </label>
  </div>

  <div className="slider-group">
    <label>
      Speed:
      <select
        value={playbackSpeed}
        onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
      >
        <option value="0.5">0.5x</option>
        <option value="1">1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </label>
  </div>

  <div className="playlist">
    <h3>Playlist</h3>
    <ul>
      {filteredSongs.map((song, index) => (
        <li
          key={index}
          onClick={() => {
            setCurrentTrack(songs.indexOf(song));
            setIsPlaying(true);
            setTimeout(() => audioRef.current.play(), 0);
          }}
          className="playlist-item"
        >
          {song.title} <small>({song.genre})</small>
        </li>
      ))}
    </ul>
  </div>
</div>

);
}
