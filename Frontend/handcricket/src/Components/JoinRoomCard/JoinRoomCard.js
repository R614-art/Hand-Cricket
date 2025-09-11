import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinRoomCard.css'

const JoinRoomCard = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim() === '') return;
    navigate('/joinroomplay', { state: { roomId } });
  };

  return (
    <div className="board-wrapper">
      <div className="board" style={{'background-image':"url('/board2.png')"}}>
        <h2 className="board-title">Join Room</h2>
        <input 
          type="text" 
          placeholder="Enter Room ID" 
          value={roomId} 
          onChange={e => setRoomId(e.target.value)} 
        />
        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
};

export default JoinRoomCard;
