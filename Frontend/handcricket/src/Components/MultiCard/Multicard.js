import React from 'react'
import { Link } from 'react-router-dom';
import './MultiCard.css'
const Multicard = () => {
  return (
    <div className="board-wrapper">
          <div className="board" style={{'background-image':"url('/board2.png')"}}>
            <h2 className="board-title">Modes</h2>
    
            <Link to="/quickplay" className="chalk-btn">
              Quick Play
            </Link>
    
            <Link to="/createroom" className="chalk-btn">
              Create Room
            </Link>
    
            <Link to="/joinroom" className="chalk-btn">
              Join Room
            </Link>
          </div>
    </div>
  )
}

export default Multicard
