import { Button, StyleSheet } from "react-native";

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    button:{
        backgroundColor: 'orange',
        width: 50,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white'
    }
});

export default styles;