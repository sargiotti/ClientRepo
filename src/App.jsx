import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import VideoContainer from './Components/VideoContainer';
import AudioPlayer from './Components/AudioPlayer';

function App() {

  return (
    <div className="App ">
      <VideoContainer />
      <AudioPlayer />
    </div>
  );
}

export default App;
