import React, { useState, useEffect } from 'react';

function VideoContainer() {
  const [url, setUrl] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchStoredUrl = async () => {
      const response = await fetch('https://35.224.219.98:3001/video');
      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          setUrl(data.url);
          fetchMetadata(data.url);
        }
      }
    };

    fetchStoredUrl();
  }, []);

  const fetchMetadata = async (videoUrl) => {
    const response = await fetch(`http://35.224.219.98:3001/video/metadata?url=${encodeURIComponent(videoUrl)}`);
    if (response.ok) {
      const metadata = await response.json();
      setMetadata(metadata);
      console.log('Metadata fetched successfully');
    } else {
      console.log('Failed to fetch metadata');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://35.224.219.98:3001/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        console.log('URL submitted successfully');
        setStatus('URL Submitted successfully');
        fetchMetadata(url);
      } else {
        console.error('Submission failed');
        setStatus('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting the URL:', error);
      setStatus(`Error submitting the URL: ${error}`);
    }
  };

  return (
    <>
      <div className="h-24 flex items-center justify-center mt-12">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            className="m-2 p-2 text-lg h-[40px] w-[300px] roboto-medium"
            value={url}
            placeholder="URL of your .MP4 Video"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="border-2 border-black py-2 px-3 m-2 roboto-medium rounded-md bg-white tracking-wider" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
      <div className="flex justify-center montserrat-semibold text-xl">
        <p>{status}</p>
      </div>
      {metadata && (
        <div className="flex flex-col items-center justify-center mt-8 text-xl montserrat-medium text-white">
          <p>Duration: {metadata.duration} seconds</p>
          <p>Height: {metadata.videoHeight} PX</p>
        </div>
      )}
    </>
  );
}

export default VideoContainer;