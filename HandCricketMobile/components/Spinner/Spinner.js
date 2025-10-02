import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function Spinner({ text }) {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="black" />
      <Text style={styles.spinnerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerText: {
    marginTop: 12,
    fontSize: 18,
    color: "black",
    fontFamily: "HanaleiFill_400Regular",
    textAlign: "center",
  },
});
