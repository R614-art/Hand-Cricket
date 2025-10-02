import React, { useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client'
import Scorecard from '../ScoreCard/ScoreCard';
import {useRoute} from '@react-navigation/native';
import {useUser} from '@clerk/clerk-expo';
import RoomModal from '../Room/Room';
import { View, Text, TouchableOpacity, Modal } from "react-native";
const Multiplayer = ({navigation}) => {
  const choices=[0,1,2,3,4,5,6]
  const socket= useRef(null);
  const route= useRoute();
  const {mode}= route.params;
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
  const user= useUser();
  const timer= useRef(null);
  useEffect(()=>{
    const s = io('https://hand-cricket-xm73.onrender.com');
    socket.current = s;

    s.on('connect',()=>{
      socket.current.emit("registerUser",{userId:user.user.id, userName : user.user.username})
      if (mode === 'quickplay') {
      socket.current.emit('quickPlay');
      setSearching(true);
      } else if (mode === 'createroom') {
        socket.current.emit('createRoom');
      } else if (mode === 'joinroom') {
        const {roomId}=route.params
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
      setDisabled(false);
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
    const handleChoice = (move) =>{ 
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
    const handleClose=()=>{
      setWaitingForPlayer(false);
      if(socket.current)
      {
        socket.current.disconnect();
        socket.current=null;
      }
      navigation.navigate("Home");
    }
  return (
    <View>
      {searching || waitingForPlayer ? (
        <RoomModal waitingForPlayer={waitingForPlayer} roomCode={roomCode} navigation={navigation} handleClose={handleClose}/>
      )
      :
      <View style={{backgroundColor:'lightblue',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
        {score===null?
        <Scorecard score={0} target={null} role={role} handleChoice={handleChoice} time={time} disabled={disabled} out={out}/>:
          score.win===null ? <Scorecard score={score.currentScore} target={score.Target} role={role} time={time} out={out} p1={role==="batting"?cMove:oppMove} disabled={disabled} round={round} p2={role==="batting"?oppMove:cMove} handleChoice={handleChoice}/>:
          <Modal
                        animationType="fade"
                        transparent={true}
                        visible={true}
                      >
                        {/* Overlay */}
                        <View style={{
                          flex: 1,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <View style={{
                            width: '80%',
                            padding: 20,
                            backgroundColor: 'lightblue',
                            borderRadius: 10,
                            alignItems: 'center'
                          }}>
                            <TouchableOpacity 
                              onPress={() => navigation.navigate("Home")} 
                              style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                padding: 5
                              }}
                            >
                            <Text style={{ fontSize: 20,fontFamily:'HanaleiFill_400Regular', fontWeight: 'bold', color: 'black' }}>×</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 30, fontFamily: 'HanaleiFill_400Regular', marginBottom: 20 }}>
                              {socket.current.id===score.win ? (playerLeft?"Opponent Left ":"")+"You Won" : "You Lost"}
                            </Text>
                            {!playerLeft && <TouchableOpacity onPress={handlePlayAgain} style={{
                              backgroundColor: 'orange',
                              paddingVertical: 10,
                              paddingHorizontal: 20,
                              borderRadius: 5,
                                borderWidth: 2,
                                borderColor: 'white',
                                width:150,
                                height:50,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                              <Text style={{ fontSize: 20, color: 'black', fontFamily: 'HanaleiFill_400Regular' }}>
                                Play Again
                              </Text>
                            </TouchableOpacity>}
                            <TouchableOpacity onPress={handleNewGame} style={{
                              backgroundColor: 'orange',
                              paddingVertical: 10,
                              paddingHorizontal: 20,
                              borderRadius: 5,
                                borderWidth: 2,
                                borderColor: 'white',
                                width: 150,
                                height: 50,
                                marginTop: 5,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                              <Text style={{ fontSize: 20, color: 'black', fontFamily: 'HanaleiFill_400Regular' }}>
                                New Game
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
        }
      </View>
      }
    </View>
  )
}

export default Multiplayer;
