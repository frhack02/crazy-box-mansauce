// src/App.jsx
import React, { useState } from 'react';
import './App.css';

const winningCodes = ["23", "178", "241"]; // Codici vincenti

function App() {
  const [code, setCode] = useState('');
  const [step, setStep] = useState('insert');
  const [isWinner, setIsWinner] = useState(false);

  const handleSubmit = () => {
    const cleanedCode = code.trim();
    if (cleanedCode === '' || isNaN(cleanedCode)) return;
    setIsWinner(winningCodes.includes(cleanedCode));
    setStep('video');
  };

  const handleVideoEnd = () => {
    setStep('result');
  };

  return (
    <div className="App">
      {step === 'insert' && (
        <div className="code-screen">
          <h1>CRAZY X MANSAUCE CLUB</h1>
          <input
            type="text"
            placeholder="Inserisci il tuo codice"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleSubmit}>Invia</button>
        </div>
      )}

      {step === 'video' && (
        <div className="video-screen">
          <video
            src={isWinner ? '/winner.mp4' : '/loser.mp4'}
            autoPlay
            onEnded={handleVideoEnd}
            className="full-video"
            playsInline
          ></video>
        </div>
      )}

      {step === 'result' && (
        <div className="result-screen">
          <h1 className="result-text">
            {isWinner ? '🎉 HAI VINTO! 🎉' : '😢 HAI PERSO 😢'}
          </h1>
          {!isWinner && (
            <p className="preorder-text">
              Clicca qui per preordinare la tua maglietta: <br />
              <a
                href="https://mansauceclub.it/collections/pre-order"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://mansauceclub.it/collections/pre-order
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;