import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../constants';

function FirstFrame() {
  const [frameUrl, setFrameUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    async function fetchStoredUrl() {
      const response = await fetch(BACKEND_URL + '/video');
      if (response.ok) {
        const data = await response.json();
        setVideoUrl(data.url);
      }
    }

    fetchStoredUrl();
  }, []);

  const handleFetchFirstFrame = async (url) => {
    try {
      const response = await fetch(`${BACKEND_URL}/video/first-frame?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        // Expecting JSON response with imageUrl
        const data = await response.json();
        setFrameUrl(data.imageUrl);
      } else {
        // Error handling for non-ok responses
        console.error('Failed to fetch the first frame:', response.statusText);
        alert('Failed to fetch the first frame.');
      }
    } catch (error) {
      // Network or parsing error handling
      console.error('Error fetching the first frame:', error);
      alert('Error occurred while fetching the first frame.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-12'>
      <button 
        className='border-2 border-black py-2 px-3 m-2 roboto-medium rounded-md bg-white tracking-wider' 
        onClick={() => handleFetchFirstFrame(videoUrl)}
      >
        Get first frame as an image
      </button>
      {frameUrl && (
        <>
          <img className='w-1/4' src={frameUrl} alt="First frame of the video" />
          <a 
            className='border-2 border-black py-1 px-2 m-2 roboto-medium rounded-md bg-white tracking-wider' 
            href={frameUrl} 
            download="first-frame.jpg"
          >
            Download First Frame
          </a>
        </>
      )}
    </div>
  );
}

export default FirstFrame;