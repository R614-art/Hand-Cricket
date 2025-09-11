import React, { useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client'
import Spinner from '../Spinner/Spinner'
import Scorecard from '../Scorecard/Scorecard';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
const Multi = ({mode}) => {
  const choices=[0,1,2,3,4,5,6]
  const socket= useRef(null);
  const location= useLocation();
  const roomId= location.state?.roomId;
  const [searching,setSearching] = useState(true);
  const [time,setTime] = useState(null);
  const [playerMove,setPlayerMove]=useState(null);
  const [oppMove,setOppMove]=useState(null);
  const [cMove,setCMove]=useState(null);
  const [role,setRole]=useState(null);
  const [score,setScore]=useState(null);
  const [playerLeft,setPlayerLeft]=useState(false);
  const [round,setRound]=useState(0);
  const [disabled,setDisabled]=useState(false);
  const [out,setOut]=useState('');
  const [roomCode, setRoomCode] = useState(null);
  const [waitingForPlayer, setWaitingForPlayer] = useState(false);
  const timer= useRef(null);
  useEffect(()=>{
    const s = io('https://hand-cricket-xm73.onrender.com');
    socket.current = s;

    s.on('connect',()=>{
      console.log('connected')
      if (mode === 'quickplay') {
      socket.current.emit('quickPlay');
      setSearching(true);
      } else if (mode === 'createroom') {
        socket.current.emit('createRoom');
      } else if (mode === 'joinroom') {
        socket.current.emit('joinRoom',roomId);
      }
    })

    s.on('roomCreated',(roomId)=>{
      setRoomCode(roomId);
      setWaitingForPlayer(true);
    })

    s.on('startgame', () => {
        console.log('started');
        setPlayerLeft(false);
        setSearching(false);
        setWaitingForPlayer(false);
        setTime(10);
        startTimer();
      })
    s.on('role',(role)=>{
        setRole(role);
      })
    
    s.on('roleSwap',(role)=>{
      setTimeout(()=>{
        setRole(role);
      },5000);
    })
    
    s.on('ballResult',(score)=>{
      const newScore=JSON.parse(score)
      const opp=newScore.bowlerMove;
      const m=newScore.batterMove;
      const status=newScore.out;
      const o=status!==''?((status===socket.current.id)?'you':'opp'):'';
      setCMove(m);
      setOppMove(opp);
      setRound((prev)=>{
        return prev+1;
      })
      setTimeout(()=>{
        setDisabled(false);
        setPlayerMove(null);
        setTime(10);
        startTimer();
        setScore(newScore);
        setOut(o);
        setTimeout(()=>{
        setOut('');
      },2000)
      },3000)
    })

    s.on('opponentLeft',()=>{
      setScore( prev=>{
        if(!prev)
          return {
        currentScore: 0,
        Target: null,
        win: socket.current.id,
        bowlerMove: null,
        batterMove: null
      };
        else if(prev.win===null)
        return {
        ...prev,
        win:socket.current.id
        }
        return prev
      });
      setPlayerLeft(true);
    })
    s.on('opponentLeftAfter',()=>{
      setPlayerLeft(true);
    })

    return ()=>{
      if(timer.current) clearInterval(timer.current);
      if(socket.current)
      {
        socket.current.disconnect();
        socket.current=null;
      }
    }
  },[])
      
    const startTimer= ()=>{
      if (timer.current) clearInterval(timer.current);
      let count=10;
      timer.current=setInterval(()=>{
        if(!playerMove)
        {
          count--;
          setTime(count);
          if(count<=0)
          {
            setDisabled(true);
            clearInterval(timer.current)
            let move=choices[Math.floor(Math.random()*7)]+"";
            setPlayerMove(move);
            //console.log(move)
            socket.current.emit('PlayerMove',move);
          }
        }
      },1000)
    }
    const handleChoice = (e) =>{ 
      let move=e.target.value
      setPlayerMove(move);
      clearInterval(timer.current)
      setDisabled(true);
      socket.current.emit('PlayerMove',move);
    }
    const handlePlayAgain = ()=> {
      socket.current.emit('playAgain');
      setScore(null);
      setSearching(true);
    }
    const handleNewGame = () =>{
      socket.current.emit('playAgainNew');
      setScore(null);
      setSearching(true);
    }
  return (
    <div>
      {searching || waitingForPlayer ? (
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          {waitingForPlayer ? (
            <div>
              <h2>Room Code:</h2>
              <div style={{
                fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0',
                padding: '1rem', border: '2px dashed #fff', borderRadius: '10px',
                display: 'inline-block'
              }}>
                {roomCode}
              </div>
              <p>Share this code with your friend to join.</p>
              <p>Waiting for opponent...</p>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )
      :
      <div>
        {score===null?
        <Scorecard score={0} target={null} role={role} handleChoice={handleChoice} time={time} disabled={disabled} out={out}/>:
          score.win===null ? <Scorecard score={score.currentScore} target={score.Target} role={role} time={time} out={out} p1={role==="batting"?cMove:oppMove} disabled={disabled} round={round} p2={role==="batting"?oppMove:cMove} handleChoice={handleChoice}/>:
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
                <h2>{socket.current.id===score.win ? (playerLeft?"Opponent Left ":"")+"You Won" : "You Lost"}</h2>
                {!playerLeft && <button onClick={handlePlayAgain}>Play Again</button>}
                <button onClick={handleNewGame}>New Game</button>
                </div>
                </div>,
                document.body
          )
        }
      </div>
      }
    </div>
  )
}

export default Multi
