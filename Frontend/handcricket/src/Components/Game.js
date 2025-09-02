import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Game.css'
import Scorecard from './Scorecard';

const Game = () => {
  const choices = [0, 1, 2, 3, 4, 5, 6];
  const [role, setRole] = useState('batting');
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [player,setPlayer]=useState(0);
  const [computer,setComputer]=useState(0);
  const [disabled,setDisabled]=useState(false)
  const [round,setRound]=useState(0);

  const handleChoice = (e) => {
    const playerMove = parseInt(e.target.value);
    const computerMove = choices[Math.floor(Math.random() * 7)];
    setRound((prev)=>{
      return prev+1;
    })
    setPlayer(playerMove);
    setComputer(computerMove);
    setDisabled(true);
    setTimeout(()=>{
      setDisabled(false);
      if (role === 'batting') {
      if (playerMove !== computerMove) {
        setScore(prev => prev + playerMove);
      } else {
        setTarget(score+1);
        setScore(0);
        setRole('bowling');
      }
    } else {
      if (playerMove !== computerMove) {
        const newScore = score + computerMove;
        if (newScore >= target){
          setTarget(null);
           setResult('Computer Won');
        }
        setScore(newScore);
      } else {
        if (score < target){
          setTarget(null);
           setResult('You Won');
        }
      }
    }
    },2000)
  };

  const handlePlayAgain = () => {
    setResult('');
    setScore(0);
    setTarget(0);
    setPlayer(0);
    setComputer(0);
    setRole('batting');
  };

  return (
    <div>
      {result === '' && (
        <Scorecard score={score} target={target} role={role} p1={player} p2={computer} time={null} round={round} disabled={disabled} handleChoice={handleChoice}/>
      )}
      
      {result !== '' &&
        ReactDOM.createPortal(
          <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 99999
          }}>
            <div style={{
              background: 'white', padding: '30px',
              borderRadius: '10px', textAlign: 'center',color:'black'
            }}>
              <h2>{result}</h2>
              <button onClick={handlePlayAgain}>New Game</button>
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
};

export default Game;
