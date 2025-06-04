import { useState, useEffect } from 'react'
import './index.css'

const App = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [isWinner, setIsWinner] = useState(false);
  const [winningCodes, setWinningCodes] = useState([]);

  useEffect(() => {
    // carica i codici vincenti
    fetch('/codes.json')
      .then((res) => res.json())
      .then((data) => setWinningCodes(data.winningCodes))
      .catch(() => {
        console.error('Errore nel caricamento dei codici');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (winningCodes.length === 0) {
      alert('Errore nel caricamento dei codici');
      return;
    }

    const isWinning = winningCodes.includes(code.trim());
    setIsWinner(isWinning);
    setVideoSrc(isWinning ? '/win.mp4' : '/lose.mp4');
    setResult(isWinning ? 'HAI VINTO' : 'HAI PERSO');
    setShowVideo(true);
  };

  return (
    <div className="container">
      {!showVideo ? (
        <div className="intro-screen">
          <h1 className="title">CRAZY X MANSAUCE CLUB</h1>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              placeholder="Inserisci il tuo codice"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit">INVIA</button>
          </form>
        </div>
      ) : (
        <div className="video-container">
          <video src={videoSrc} autoPlay onEnded={() => setShowVideo(false)} />
          <h1 className="result">{result}</h1>
          {!isWinner && (
            <p className="preorder">
              clicca qui per preordinare la tua maglietta:
              <br />
              <a href="https://mansauceclub.it/collections/pre-order" target="_blank" rel="noopener noreferrer">
                https://mansauceclub.it/collections/pre-order
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;