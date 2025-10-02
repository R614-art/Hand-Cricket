import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function JoinRoom({navigation})
{
    const [roomId,setRoomId]=useState("");
    return (
        <Modal
            animationType="fade"
            visible={true}
            transparent={true}
        >
            <View
             style={{
                backgroundColor: 'grey',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent:'center'
             }}
            >
                <View
                    style={{
                        backgroundColor: 'lightblue',
                        width: 300,
                        height: 220,
                        alignItems:'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        borderRadius: 10,
                        borderWidth: 3,
                        borderColor: 'orange'
                    }}
                >
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("RoomOptions")} 
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 2,
                        }}
                    >
                    <Text style={{ fontSize: 30,fontFamily:'HanaleiFill_400Regular', fontWeight: 'bold', color: 'black' }}>×</Text>
                    </TouchableOpacity>
                    <TextInput 
                        style={{
                            backgroundColor:'white',
                            fontFamily:'HanaleiFill_400Regular',
                            fontSize: 25,
                            borderRadius: 10,
                            borderWidth: 3,
                            borderColor: 'orange',
                            width: 200,
                            height: 70,
                            alignItems: 'center',
                            justifyContent:'center'
                        }}
                        placeholder="Enter Code"
                        value={roomId}
                        onChangeText={setRoomId}
                    />
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('Multiplayer',{mode:'joinroom',roomId:roomId})}
                        style={{
                        backgroundColor:'orange',
                        borderWidth:3,
                        borderColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        width: 200,
                        height: 70,
                        borderRadius: 10
                    }}
                    >
                    <Text style={{fontFamily:'HanaleiFill_400Regular',fontSize:25,color:'black'}}>Join Room</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}