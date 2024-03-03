import React, { useState, useEffect } from 'react';

function AudioPlayer() {
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
const [url, setUrl] = useState('')

  useEffect(() => {
    const fetchStoredUrl = async () => {
      const response = await fetch('http://localhost:3001/video');
      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          setUrl(data.url);
        }
      }
    };

    fetchStoredUrl();
  }, []);
  const handleFetchAudio = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/video/audio?url=${encodeURIComponent(url)}`);
      console.log(url)
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        console.error('Failed to fetch audio');
        alert('Failed to fetch audio'); // Show error feedback
      }
    } catch (error) {
      console.error('Error fetching audio:', error);
      alert('Error fetching audio');
    }
    setLoading(false);
  };



  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <button className='p-3 m-3 bg-white border-2 border-black rounded-md' onClick={handleFetchAudio} disabled={loading}>
        {loading ? 'Loading...' : 'Load 15 sec of Audio'}
      </button>
      {audioUrl && (
        <div className='flex flex-col items-center justify-center'>
          <audio controls src={audioUrl} className=''>
            Your browser does not support the audio element.
          </audio>
          <a href={audioUrl} download="clip.mp3" className="p-3 m-3 bg-white border-2 border-black rounded-md">
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;