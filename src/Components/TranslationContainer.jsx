import React, { useState } from 'react';

function TranslationContainer() {
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [speechUrl, setSpeechUrl] = useState(''); // State to hold the speech audio URL
  const [isLoading, setIsLoading] = useState(false);

  const handleAudioProcessing = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/processAudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetLanguage: 'es' }), // Hardcoded to Spanish
      });
      if (response.ok) {
        const { transcription, translation } = await response.json();
        setTranscription(transcription);
        setTranslation(translation);
      } else {
        console.error('Failed to process the audio.');
        // Handle errors appropriately in your UI.
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors appropriately in your UI.
    }
    setIsLoading(false);
  };

  const handleConvertTextToSpeech = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/convertTextToSpeech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: translation }), // Use the translated text
      });
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setSpeechUrl(audioUrl);
      } else {
        console.error('Failed to convert text to speech.');
        alert('Failed to convert text to speech.');
      }
    } catch (error) {
      console.error('Error converting text to speech:', error);
      alert('Error converting text to speech.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-12">
        <div className="w-1/2 text-white">
          <h2 className='my-2 montserrat-semibold text-lg tracking-wider'>Transcription:</h2>
          <p className=' roboto-medium text-sm'>{transcription}</p>
          <h2 className='my-2 montserrat-semibold tracking-wider text-lg'>Translation to spanish:</h2>
          <p className='roboto-medium text-sm'>{translation}</p>
        </div>
        <button
          className="border-2 border-black py-2 px-3 m-2 roboto-medium rounded-md bg-white tracking-wider"
          onClick={handleAudioProcessing}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Process Audio and Translate"}
        </button>
      </div>
      <div className="flex items-center justify-center mt-12">
        {speechUrl && (
          <audio controls src={speechUrl}>
            Your browser does not support the audio element.
          </audio>
        )}
        {translation && (
          <button
            className="border-2 border-black py-2 px-3 m-2 roboto-medium rounded-md bg-white tracking-wider"
            onClick={handleConvertTextToSpeech}
            disabled={isLoading}
          >
            {isLoading ? "Converting..." : "Convert Text to Speech"}
          </button>
        )}
      </div>
    </div>
  );
}

export default TranslationContainer;