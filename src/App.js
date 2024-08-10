import React, { useState } from 'react';
import './App.css'; // Importing the CSS file for custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { FaSyncAlt } from 'react-icons/fa'; // Import the refresh icon

function App() {
  const [Name, setName] = useState('');
  const [Res, setRes] = useState('resultats');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');

  const charMap = {
    'e': '1', 'c': '3', '5': 'a', '6': '9', '8': '7', 'f': '0', 'b': '4',
    'a': '5', '0': 'f', '4': 'b', 'd': '2', '1': 'e', '3': 'c',
    // Adding reverse mappings
    '1': 'e', '3': 'c', 'a': '5', '9': '6', '7': '8', '0': 'f',
    '4': 'b', '5': 'a', 'f': '0', 'b': '4', '2': 'd', 'e': '1', 'c': '3'
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
    setError('');
  };

  const handleShowResult = () => {
    if (Name.trim() === '') {
      setError('Please enter a Wi-Fi name.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
      convertInputToResult(Name);
    }, 3000); // 3-second loading delay
  };

  const convertInputToResult = (input) => {
    let converted = input.startsWith('fh') ? 'wlan' : '';
    const startIndex = input.startsWith('fh') ? 2 : 0;

    for (let i = startIndex; i < input.length; i++) {
      const char = input[i];
      if (charMap[char] !== undefined) {
        converted += charMap[char];
      } else {
        converted += char;
      }
    }
    setRes(converted);
  };

  const handleReset = () => {
    setName('');
    setRes('resultats');
    setShowResult(false);
    setError('');
  };

  return (
    <div className="App d-flex align-items-center justify-content-center">
      <div className="input-container">
        <div className="d-flex justify-content-end">
          <button className="btn refresh-button" onClick={handleReset}>
          <span style={{color:'#0f0'}}>
          <FaSyncAlt />

            </span>

          </button>
        </div>
        <input
          type='text'
          className="form-control input-field"
          value={Name}
          onChange={handleInputChange}
          placeholder='Enter WiFi name'
        />
        {error && <div className="error-message">{error}</div>}
        <button className="btn show-result-button mt-3" onClick={handleShowResult}>
        <span style={{color:'#0f0'}}>Show Result</span>
        </button>
        {isLoading && (
          <div className="loading-text">Loading...</div>
        )}
        {showResult && (
          <div className="result-text">
            {Res}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
