## Technologies and APIs:

- **Frontend:** React
- **Backend:** Node.js with Express
- **Video Processing:** fluent-ffmpeg
- **Storage:** Google Cloud Storage
- **APIs:**
  - Google Cloud Vision
  - Google Cloud Text-to-Speech
  - Google Cloud Translation (Specify if used for clarity)
  - Google Cloud Text-to-Speech (Confirming the inclusion)

## Checkpoint Summary:

1. **URL Management:** Node.js API for storing/retrieving the video URL in a JSON file.
2. **Metadata Extraction:** fluent-ffmpeg to extract video duration and resolution.
3. **Audio Segment Handling:** fluent-ffmpeg for audio extraction and backend API for serving the audio file.
4. **Transcription and Translation:** Utilized Google Cloud Translation for text translation and integrated a speech-to-text API (clarify if it's Google Cloud Speech-to-Text) for transcription.
5. **Speech Synthesis:** Google Cloud Text-to-Speech API to convert translated text to audio.
6. **Frame Extraction:** fluent-ffmpeg to capture the first frame and Google Cloud Storage for hosting.
7. **OCR Feature:** Google Cloud Vision API to perform OCR on the first frame image.
