import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import Spinner from '../Spinner/Spinner'
import './LeaderBoard.css'
const LeaderBoard = () => {
    const [wins,setWins]=useState([]);
    const [scores,setScores]=useState([]);
    const {isLoaded,getToken}= useAuth();
    useEffect(()=>{
        if(!isLoaded)
            return;
        const getleaderboard= async ()=>{
            const token=await getToken();
            const res= await fetch('https://hand-cricket-xm73.onrender.com/getleaderboard',{
                headers:{
                   Authorization : `Bearer ${token}`
                }
            })
            if(!res.ok) throw new Error("Cannot fetch details");
            const data= await res.json();
            setWins(data.wins);
            setScores(data.scores);
        }
        getleaderboard();
    },[])
  return (
    <div>
    { !(wins.length==0 && scores.length==0)?
    <div className='board-wrapper'>
  <div className="leaderboard-board" style={{ 
    'background': "url('/board2.png')",
    'backgroundRepeat': "no-repeat",
    'backgroundSize': "100% 100%",
    'backgroundPosition': "center"
  }}>
    <h2 className='chalk'>Leaderboard</h2>

    <div className="leaderboard-content">
      {/* Wins Column */}
      <div className="column">
        <h3 className='chalk'>Wins</h3>
        <ol type='number'>
          {wins.map((w, index) => (
            (w.userName && w.wins!=0) && <li key={index} className='chalk'>{w.userName} - {w.wins}</li>
          ))}
        </ol>
      </div>

      {/* Highest Score Column */}
      <div className="column">
        <h3 className='chalk'>Highest Score</h3>
        <ol type='number'>
          {scores.map((s, index) => (
            (s.userName &&  s.highScore!==-1) && <li key={index} className='chalk'>{s.userName} - {s.highScore}</li>
          ))}
        </ol>
      </div>
    </div>
  </div>
</div>
    :
    <Spinner text="fetching leaderboard"/>
    }
</div>
  )
}

export default LeaderBoard
