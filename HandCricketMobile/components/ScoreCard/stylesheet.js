import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightblue',
  },
  score: {
    backgroundColor: 'white',
    flexDirection: 'column', // top row + info row
    padding: 10,
    borderRadius: 10,
    marginTop: 70,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // left/right alignment
    alignItems: 'center',
    marginBottom: 10,
  },
  playerScore: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  opponentScore: {
    alignItems: 'flex-end',
    justifyContent:'center'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // target left, time right
    alignItems: 'center',
  },
  scoreText: {
    color: 'black',
    fontFamily: 'HanaleiFill_400Regular',
    fontSize: 25,
  },
  buttonsContainer: {
    position: 'fixed',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50, // adjust as needed
  },
  button: {
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  playArea:{
    marginHorizontal: '10%',
    maxWidth: '80%',
    height: '27%',
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'orange',
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default styles;
