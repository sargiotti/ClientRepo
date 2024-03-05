import React from 'react';
import './index.css';
import VideoContainer from './Components/VideoContainer';
import AudioPlayer from './Components/AudioPlayer';
import TranslationContainer from './Components/TranslationContainer';
import FirstFrame from './Components/FirstFrame';
import OCRResults from './Components/OCRResults';

function App() {

  return (
    <div className="App ">
      <VideoContainer />
      <AudioPlayer />
      <TranslationContainer />
      <FirstFrame />
      <OCRResults/>
    </div>
  );
}

export default App;
