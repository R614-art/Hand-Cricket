import { Animated, Image, View } from "react-native";
import styles from "./stylesheet";
import mainImg from '../../assets/Skins/basic/0.png';
import { useEffect, useRef } from "react";

export default function(){
    const scale=useRef(new Animated.Value(1)).current;
    useEffect(()=>{
        Animated.loop(
            Animated.sequence([
                
            Animated.timing(scale,{
                toValue: 1.2,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(scale,{
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ])
        ).start();
    },[scale]);

    return (
        <View style={styles.middleImage}>
            <Animated.Image source={mainImg} style={{height:350, width:350, transform:[{scale:scale}]}} />
        </View>
    );
}