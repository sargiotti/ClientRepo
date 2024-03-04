import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import VideoContainer from './Components/VideoContainer';
import AudioPlayer from './Components/AudioPlayer';
import TranslationContainer from './Components/TranslationContainer';

function App() {

  return (
    <div className="App ">
      <VideoContainer />
      <AudioPlayer />
    <TranslationContainer/>
    </div>
  );
}

export default App;
