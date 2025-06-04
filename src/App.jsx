import { useState } from "react";
import "./App.css";

const winningCodes = ["027", "158", "299"]; // ← Qui sono i 3 codici vincenti a caso

function App() {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmedCode = code.trim();

    // Regex per validare formato esatto "001" fino a "300"
    const validCode = /^([0-9]{3})$/;

    if (!validCode.test(trimmedCode)) {
      setError("Inserisci il numero che ti è stato fornito correttamente.");
      return;
    }

    const numericValue = parseInt(trimmedCode);
    if (numericValue < 1 || numericValue > 300) {
      setError("Inserisci il numero che ti è stato fornito correttamente.");
      return;
    }

    setError("");
    setIsWinner(winningCodes.includes(trimmedCode));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="video-container">
        <video
          src={isWinner ? "/winner.mp4" : "/loser.mp4"}
          autoPlay
          playsInline
          onEnded={() => {}}
          className="video-player"
        />
        <div className="overlay-text">
          {isWinner ? (
            <h1 className="win-text">🎉 HAI VINTO! 🎉</h1>
          ) : (
            <>
              <h1 className="lose-text">😢 HAI PERSO 😢</h1>
              <p className="preorder-link">
                Clicca qui per preordinare la tua maglietta:<br />
                <a href="https://mansauceclub.it/collections/pre-order" target="_blank" rel="noopener noreferrer">
                  mansauceclub.it
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="start-screen">
      <h1 className="title">CRAZY X MANSAUCE CLUB</h1>
      <input
        type="text"
        placeholder="Inserisci il codice"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-input"
      />
      <button onClick={handleSubmit} className="submit-button">INVIA</button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default App;