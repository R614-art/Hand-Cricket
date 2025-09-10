import React from 'react'
import Buttons from '../Buttons/Buttons'
import './Scorecard.css'
import Move from '../Move/Move'
const Scorecard = ({score,target,role,time,p1,p2,round,disabled,out,handleChoice}) => {
  return (
    <div className="game-container">
        <div className="top-bar">
            <h2 className="result">{role === 'batting' ? 'You are Batting' : 'You are Bowling'}</h2>
            <p className="score">
              Score: {score} {target!==null && `| Target: ${target}`} {time!==null && `Time left : ${time}` }
            </p>
        </div>
        <div className="play-area">
            <div className="player-box">
          <div className="player-label">YOU</div>
          <Move move={p1} round={round} />
        </div>

        {/* Bowler box */}
        <div className="player-box">
          <div className="player-label">Opponent</div>
          <Move move={p2} round={round} />
        </div>
        </div>
        <Buttons handleChoice={handleChoice} disabled={disabled} />
        {out !== '' && (
        <div className="overlay">
          <div className="out-card">
            <h2>{out==='you'?"You are bowled!!!":"You bowled him!!!"}</h2>
            {target !== null && <p>Target: {target}</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export default Scorecard
