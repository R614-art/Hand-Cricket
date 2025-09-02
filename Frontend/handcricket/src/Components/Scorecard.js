import React from 'react'
import Buttons from './Buttons'
import './Scorecard.css'
import Move from './Move'
const Scorecard = ({score,target,role,time,p1,p2,round,disabled,handleChoice}) => {
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
    </div>
  )
}

export default Scorecard
