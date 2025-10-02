import { View, Text, ActivityIndicator, Modal } from "react-native";
import styles from "./stylesheet";
import Buttons from "../Buttons/Buttons";
import { HanaleiFill_400Regular } from '@expo-google-fonts/hanalei-fill';
import { useFonts } from '@expo-google-fonts/hanalei-fill';
import Move from "../Move/Move";

export default function Scorecard({score,target,role,time,p1,p2,round,disabled,out,handleChoice}){
    return (
        <View>
        <View style={styles.container}>
            <View style={styles.score}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={styles.playerScore}>
                        <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>You</Text>
                        <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>{role==='batting'?score??'':(target===null?'Yet to bat':(target-1)??'')}</Text>
                    </View>
                    <View style={styles.opponentScore}>
                        <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>Opponent</Text>
                        <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>{role==='batting'?(target===null?'Yet to bat':(target-1)??''):score??''}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    {target && <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>Target : {target}</Text>}
                    {time && <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>Time : {time} </Text>}
                </View>
            </View>
            <View style={styles.playArea}>
                <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>You{role==='batting'?' (bat)':''}</Text>
                <Move move={p1} round={round}/>
            </View>
            <View style={styles.playArea}>
                <Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>Opponent{role==='batting'?'':'(bat)'}</Text>
                <Move move={p2} round={round} />
            </View>
            <View style={styles.buttonsContainer}>
                <Buttons handleChoice={handleChoice} disabled={disabled}/>
            </View>
        </View>
        {out !== '' &&
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => {}} // add a handler if you want to close it
            >
                <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.6)', // semi-transparent background
                justifyContent: 'center',
                alignItems: 'center'
                }}>
                <View style={{
                    backgroundColor: 'lightblue',
                    padding: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    minWidth: 250
                }}>
                    <Text style={{
                    color: 'black',
                    fontFamily: 'HanaleiFill_400Regular',
                    fontSize: 25,
                    marginBottom: 10
                    }}>
                    {out === 'you' ? 'You are out!' : 'Opponent is out!'}
                    </Text>
                    <Text style={{
                    color: 'black',
                    fontFamily: 'HanaleiFill_400Regular',
                    fontSize: 20
                    }}>
                    Target : {target}
                    </Text>
                </View>
                </View>
            </Modal>
        }

        </View>
    );
}