import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useState} from "react";
import Scorecard from "../ScoreCard/ScoreCard";


export default function Practice({navigation}){
    const choices = [0, 1, 2, 3, 4, 5, 6];
      const [role, setRole] = useState('batting');
      const [target, setTarget] = useState(null);
      const [score, setScore] = useState(0);
      const [result, setResult] = useState('');
      const [player,setPlayer]=useState(0);
      const [computer,setComputer]=useState(0);
      const [disabled,setDisabled]=useState(false);
      const [out,setOut]=useState('')
      const [round,setRound]=useState(0);
    
      const handleChoice = (move) => {
        const playerMove = parseInt(move);
        const computerMove = choices[Math.floor(Math.random() * 7)];
        setRound((prev)=>{
          return prev+1;
        })
        setPlayer(playerMove);
        setComputer(computerMove);
        setRound((prev)=>{
            return prev+1;
        })
        setDisabled(true);
        setTimeout(()=>{
          setDisabled(false);
          if (role === 'batting') {
          if (playerMove !== computerMove) {
            setScore(prev => prev + playerMove);
          } else {
            setTarget(score+1);
            setOut('you');
            setTimeout(()=>{
              setOut('');
              setScore(0);
              setRole('bowling');
            },2000)
          }
        } else {
          if (playerMove !== computerMove) {
            const newScore = score + computerMove;
            if (newScore >= target){
              setTarget(null);
               setResult('Computer Won');
            }
            setScore(newScore);
          } else {
            if (score < target){
              setTarget(null);
               setResult('You Won');
            }
          }
        }
        },2000)
      };
    
      const handlePlayAgain = () => {
        setResult('');
        setScore(0);
        setTarget(null);
        setPlayer(0);
        setComputer(0);
        setRole('batting');
      };
    
      return (
        <View style={{backgroundColor:'lightblue',width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}}>
            {result === '' && (
                <Scorecard score={score} target={target} role={role} p1={player} p2={computer} time={null} round={round} disabled={disabled} out={out} handleChoice={handleChoice}/>
            )}
          {result !== '' && (
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
                           padding: 2
                        }}
                        >
                      <Text style={{ fontSize: 20,fontFamily:'HanaleiFill_400Regular',fontSize:30, fontWeight: 'bold', color: 'black' }}>×</Text>
                    </TouchableOpacity>
                  <Text style={{ fontSize: 30, fontFamily: 'HanaleiFill_400Regular', marginBottom: 20 }}>
                    {result}
                  </Text>
                  <TouchableOpacity onPress={handlePlayAgain} style={{
                    backgroundColor: 'orange',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                      borderWidth: 2,
                      borderColor: 'white'
                  }}>
                    <Text style={{ fontSize: 20, color: 'black', fontFamily: 'HanaleiFill_400Regular' }}>
                      New Game
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      );
}