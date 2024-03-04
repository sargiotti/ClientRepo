import React, { useState } from 'react';

function TranslationContainer() {
  const [transcription, setTranscription] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAudioProcessing = async () => {
    setIsLoading(true);
    try {
      // Assuming you're sending a POST request to include additional data like target language.
      // If not, you might want to switch to a GET request.
      const response = await fetch('/processAudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetLanguage: 'es' }), // Example: specifying Spanish as target language.
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

  return (
    <div>
      <button onClick={handleAudioProcessing} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Process Audio'}
      </button>
      <div>
        <h3>Transcription:</h3>
        <p>{transcription}</p>
        <h3>Translation:</h3>
        <p>{translation}</p>
      </div>
    </div>
  );
}

export default TranslationContainer;