import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    width: '100%',
    height: '100%'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 60
  },
  coins: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1b7ee2ff',
    borderRadius: 2,
    height: 35,
    paddingHorizontal: 8,
    color: 'white',
    borderColor: 'gold',
    borderWidth: 1,
  },
  coinText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal : 5 
  },
  coin:{
    height: 35,
    width: 40
  },

  LeftButtons: {
    position:'absolute',
    top: 175,
    left: 15,
    flexDirection: 'column',
    gap: 30
  },
  shop: {
    backgroundColor:'#1b7ee2ff',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gold',
    borderWidth: 2,
    borderRadius: 60,
  },
  rightButtons: {
    position:'absolute',
    top: 175,
    right: 15,
    flexDirection: 'column',
    gap: 30
  },
  skin: {
    backgroundColor:'#1b7ee2ff',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gold',
    borderWidth: 2,
    borderRadius: 60,
  },
  skins: {
    height:55,
    width: 55
  },
  bottomBar:{
    position: 'absolute',
    top: 750,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 25,
    width: '100%',
    height: 75
  },
  mainButton:{
    height:"100%",
    width:125,
    backgroundColor:'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 10
  },
  sideButtons:{
    height:"80%",
    width:100,
    backgroundColor:'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3
  },
  buttonText:{
    color:'black',
    fontWeight:'bold',
    fontSize: 20,
    textShadowColor: 'maroon',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  buttonAligns:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;