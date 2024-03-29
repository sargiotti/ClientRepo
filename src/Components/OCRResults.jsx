import React, { useState } from 'react';
import { BACKEND_URL } from '../constants';
function OCRResults() {
  const [ocrText, setOcrText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePerformOCR = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BACKEND_URL + '/performOCR');
      if (response.ok) {
        const data = await response.json();
        setOcrText(data.text);
        setIsLoading(false);
      } else {
        alert('Failed to perform OCR.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error performing OCR:', error);
      alert('Error occurred while performing OCR.');
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-row items-center justify-center mt-12 pb-52'>

      {ocrText && (
        <div className='text-white w-[30vh]'>
          <h3 className='my-2 montserrat-semibold text-lg tracking-wider'>OCR Result:</h3>
          <p className=' roboto-medium text-sm'>{ocrText}</p>
        </div>
      )}
      <button 
        className='border-2 border-black py-2 px-3 m-2 roboto-medium rounded-md bg-white tracking-wider'
        onClick={handlePerformOCR}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Perform OCR'}
      </button>
    </div>
  );
}

export default OCRResults;
