import React, { useState, useEffect } from 'react';

function AudioPlayer() {
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set the initial audio URL to the GCS file location
    setAudioUrl('https://storage.googleapis.com/marcosargiottitask/audio-buffer.mp3');
  }, []);

  const handleAudioExtraction = async () => {
    setLoading(true);
    try {
      // Fetch the latest video URL from the server
      const urlResponse = await fetch('http://35.224.219.98:3001/video');
      if (urlResponse.ok) {
        const { url } = await urlResponse.json();
        // Trigger audio processing with the latest video URL
        const audioResponse = await fetch(`http://35.224.219.98:3001/video/audio?url=${encodeURIComponent(url)}`);
        if (audioResponse.ok) {
          // Append a timestamp to the audio URL to prevent caching
          const newAudioUrl = `https://storage.googleapis.com/marcosargiottitask/audio-buffer.mp3?timestamp=${new Date().getTime()}`;
          setAudioUrl(newAudioUrl);
          alert('Audio has been processed and updated.');
        } else {
          console.error('Failed to process audio');
          alert('Failed to process audio');
        }
      } else {
        console.error('Failed to fetch the latest video URL');
        alert('Failed to fetch the latest video URL');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error during the process');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center mt-8">
        {audioUrl && (
          <div className="flex flex-col items-center justify-center">
            <audio controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <button onClick={handleAudioExtraction} disabled={loading} className="border-2 border-black py-2 px-3 m-2 roboto-medium rounded-md bg-white tracking-wider">
          {loading ? 'Processing...' : 'Process Audio'}
        </button>
      </div>
      <p className='text-white text-center'>To download the audio clip press on the options button of the player</p>
    </>
  );
}

export default AudioPlayer;

