import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function Move({ move=null,round }) {
  const skins = {
    0: require("../../assets/Skins/basic/0.png"),
    1: require("../../assets/Skins/basic/1.png"),
    2: require("../../assets/Skins/basic/2.png"),
    3: require("../../assets/Skins/basic/3.png"),
    4: require("../../assets/Skins/basic/4.png"),
    5: require("../../assets/Skins/basic/5.png"),
    6: require("../../assets/Skins/basic/6.png"),
  };

  const fistOpacity = useRef(new Animated.Value(1)).current;
  const fistTranslate = useRef(new Animated.Value(0)).current;
  const gestureOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fistOpacity.setValue(1);
    gestureOpacity.setValue(0);
    fistTranslate.setValue(0);

    Animated.sequence([
      Animated.timing(fistTranslate, {
        toValue: -5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fistTranslate, {
        toValue: 5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fistTranslate, {
        toValue: -5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fistTranslate, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fistOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(gestureOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [round]);

  return (
    <View style={styles.container} key={round}>
      {/* Fist */}
      <Animated.Image
        source={skins[0]}
        style={[
          styles.image,
          { opacity: fistOpacity, transform: [{ translateX: fistTranslate }] },
        ]}
        resizeMode="contain"
      />

      {/* Gesture */}
      <Animated.Image
        source={skins[move===null?0:move]}
        style={[styles.image, { opacity: gestureOpacity }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 200,
    height: 200,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
