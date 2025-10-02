import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import styles from "./stylesheet";
import { HanaleiFill_400Regular } from '@expo-google-fonts/hanalei-fill';
import { useFonts } from '@expo-google-fonts/hanalei-fill';

export default function Buttons({handleChoice,disabled}){
    const choices=[0,1,2,3,4,5,6];
     const [fontsLoaded] = useFonts({
                HanaleiFill_400Regular,
            });
    
        if (!fontsLoaded) {
            return (
                <View >
                    <ActivityIndicator size="large" color="gold" />
                    <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
                </View>
            );
        }
    return (
      <View style={styles.container}>
        {
            choices.map((choice)=>{
                return <TouchableOpacity key={choice} disabled={disabled} style={styles.button} onPress={()=>handleChoice(choice)}><Text style={{color:'black',fontFamily:'HanaleiFill_400Regular', fontSize:25}}>{choice}</Text></TouchableOpacity>
            })
        }
      </View>  
    );
}