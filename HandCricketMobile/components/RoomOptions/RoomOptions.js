import { Modal, TouchableOpacity, View, Text } from "react-native";


export default function RoomOptions({navigation}){
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
                        onPress={() => navigation.navigate("Home")} 
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 2,
                        }}
                    >
                    <Text style={{ fontSize: 30,fontFamily:'HanaleiFill_400Regular', fontWeight: 'bold', color: 'black' }}>×</Text>
                    </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>navigation.navigate('Multiplayer',{mode:'createroom'})}
                    style={{
                        backgroundColor:'orange',
                        borderWidth:3,
                        borderColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 200,
                        height: 70,
                        borderRadius: 10
                    }}
                >
                    <Text style={{fontFamily:'HanaleiFill_400Regular',fontSize:28,color:'black'}}>Create Room</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>navigation.navigate('JoinRoom')}
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
                    <Text style={{fontFamily:'HanaleiFill_400Regular',fontSize:28,color:'black'}}>Join Room</Text>
                </TouchableOpacity>
            </View>

        </View>
        </Modal>
    )
}