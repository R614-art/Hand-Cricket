import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const Card = () => {
  return (
    <div className="board-wrapper">
      <div className="board" style={{'background-image':"url('/board2.png')"}}>
        <h2 className="board-title">Welcome to Hand Cricket</h2>

        <Link to="playwithcomp" className="chalk-btn">
          Play With Computer
        </Link>

        <Link to="/multioptions" className="chalk-btn">
          Multiplayer
        </Link>

        <Link to="/instructions" className="chalk-btn">
          Instructions
        </Link>
      </div>
    </div>
  );
};

export default Card;
