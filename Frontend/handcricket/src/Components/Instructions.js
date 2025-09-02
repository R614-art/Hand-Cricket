import React from 'react'
import "./Instructions.css"

const Instructions = () => {
  return (
    <div className="instruction-wrapper">
      <div className="board" style={{'background-image':"url('/board2.png')"}}>
        <div className="board-body">
          <h2 className="board-title">Instructions</h2>

          <h4 className="chalk-subtitle">Play With Computer</h4>
          <ol className="chalk-list">
            <li>The player gets <strong>10 seconds</strong> to choose a number from <strong>0, 1, 2, 3, 4, 5, 6, 10</strong>.</li>
            <li>If no choice is made in 10 seconds, a random number is chosen on behalf of the player.</li>
            <li>If both the player's choice and the computer's choice match, then the batter is <strong>out</strong>, else the choice is added to the score.</li>
            <li>The computer wins if the target is reached; otherwise, the opponent wins if the player gets out before reaching the target.</li>
          </ol>

          <h4 className="chalk-subtitle">Multiplayer</h4>
          <ol className="chalk-list">
            <li>Each player gets <strong>10 seconds</strong> to choose a number from <strong>0, 1, 2, 3, 4, 5, 6, 10</strong>.</li>
            <li>If no choice is made in 10 seconds, a random number is chosen on behalf of the player.</li>
            <li>If both players choose the same number, the batter is <strong>out</strong>, else the choice is added to the score.</li>
            <li>The next player wins if the target is reached; otherwise, the opponent wins if the player gets out before reaching the target.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Instructions
