import { useState } from 'react';
import axios from 'axios';

const Input = ({ onNewMessage }) => {  // Make sure to destructure the prop here
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message', message);
    if (file) {
      formData.append('file', file);
    }

    setIsLoading(true);
    
    try {
      // Store the message for later display if needed
      const currentMessage = message;
      
      // Add user message to chat
      onNewMessage(currentMessage, true);
      
      // Reset input fields immediately
      setMessage('');
      setFile(null);

      // First send input
      await axios.post('http://localhost:5000/api/input', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Then get Gemini response
      const geminiResponse = await axios.get('http://localhost:5000/api/gemini');
      onNewMessage(geminiResponse.data.result, false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileName = (fileName) => {
    const [name, extension] = fileName.split('.');
    if (name.length > 3) {
      return `${name.substring(0, 3)}...${extension}`;
    }
    return fileName;
  };

  return (
    <div className="flex flex-col w-full z-100">
      <form className="flex items-center justify-center w-full h-[50px] bg-gray-800 px-3 rounded-lg border border-gray-700 focus-within:border-gray-600" onSubmit={handleSubmit}>
        <div className="relative flex items-center justify-center">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400" />
          ) : (
            <label htmlFor="file" className="cursor-pointer flex items-center justify-center relative hover:text-white hover:bg-gray-700 p-1 rounded transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337" className="h-5">
                <circle strokeWidth={20} stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5" />
                <path strokeLinecap="round" strokeWidth={25} stroke="#6c6c6c" d="M167.759 79V259" />
                <path strokeLinecap="round" strokeWidth={25} stroke="#6c6c6c" d="M79 167.138H259" />
              </svg>
              <span className="absolute top-[-40px] hidden opacity-0 text-white text-xs bg-black p-2 border border-gray-700 rounded shadow-md transition-all">Add an image</span>
            </label>
          )}
          <input type="file" id="file" name="file" className="hidden" onChange={handleFileChange} disabled={isLoading} />
        </div>
        <input
          placeholder="Text -> Notes"
          type="text"
          id="messageInput"
          value={message}
          onChange={handleMessageChange}
          className="flex-grow mx-2 bg-transparent outline-none border-none text-white whitespace-nowrap overflow-hidden text-ellipsis"
          disabled={isLoading}
        />
        <button id="sendButton" type="submit" className="flex items-center justify-center bg-transparent outline-none border-none cursor-pointer transition-all hover:text-white hover:bg-gray-700 p-1 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663" className="h-5">
            <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
          </svg>
        </button>
      </form>
      {file && (
        <div className="mt-2 p-2 bg-gray-700 border border-gray-600 rounded text-white text-xs inline-block w-20 self-align-center">
          {formatFileName(file.name)}
        </div>
      )}
    </div>
  );
};

export default Input;