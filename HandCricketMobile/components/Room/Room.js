import React from "react";
import { Modal, View, Text, StyleSheet,TouchableOpacity } from "react-native";
import Spinner from "../Spinner/Spinner";

export default function RoomModal({ waitingForPlayer, roomCode, navigation,handleClose }) {
  return (
    <Modal animationType="fade" transparent={true} >
      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity 
                        onPress={handleClose} 
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 2,
                        }}
                    >
                    <Text style={{ fontSize: 30,fontFamily:'HanaleiFill_400Regular', fontWeight: 'bold', color: 'black' }}>×</Text>
                    </TouchableOpacity>
          {waitingForPlayer ? (
            <View style={styles.centerContent}>
              <Text style={styles.heading}>Room Code:</Text>
              <View style={styles.codeBox}>
                <Text style={styles.code}>{roomCode}</Text>
              </View>
              <Text style={styles.text}>Share this code with your friend to join.</Text>
              <Text style={styles.text}>Waiting for opponent...</Text>
            </View>
          ) : (
            <Spinner text="Searching for opponent..." />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontFamily: "HanaleiFill_400Regular",
    marginBottom: 12,
    color: "black",
  },
  codeBox: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "white",
    borderRadius: 10,
    marginVertical: 12,
  },
  code: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "HanaleiFill_400Regular",
    color: "black",
  },
  text: {
    fontSize: 16,
    color: "black",
    marginTop: 4,
    textAlign: "center",
    fontFamily: "HanaleiFill_400Regular"
  },
});
