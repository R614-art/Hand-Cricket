import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './MultiCard.css'
import Spinner from '../Spinner/Spinner';
const Multicard = () => {
  const [connecting,setConnecting]=useState(true);
  useEffect(()=>{
    fetch('https://hand-cricket-xm73.onrender.com/ping')
    .then(()=>{
      setConnecting(false);
    })
    .catch((err)=>{
      console.log('unable to connect');
    })
  },[])
  return (
    <div>
    {!connecting?
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
      :
      <Spinner  text='Connecting to the server'/>
    }
    </div>
  )
}

export default Multicard
