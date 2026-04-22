import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const ImageSetTwo = () => {
  return (
    <View>
      <Image source={require("../assets/hero1.jpg")} style={styles.image1} />
      <Image source={require("../assets/hero3.jpg")} style={styles.image2} />
      <Image source={require("../assets/hero3.jpg")} style={styles.image3} />
      <Image source={require("../assets/hero2.jpg")} style={styles.image4} />
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteImage: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
    opacity: 0.8,
  },
  image1: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
    opacity: 0.8,
    top: 20,
    left: 20,
    transform: [{ translateX: 20 }, { translateY: 50 }, { rotate: "-15deg" }],
  },
  image2: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
    opacity: 0.8,
    top: -20,
    left: 100,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "-5deg" }],
  },
  image3: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: "absolute",
    opacity: 0.8,
    top: 140,
    left: -50,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "15deg" }],
  },
  image4: {
    height: 200,
    width: 200,
    borderRadius: 20,
    position: "absolute",
    top: 120,
    left: 100,
    opacity: 0.8,
    transform: [{ translateX: 50 }, { translateY: 50 }, { rotate: "-15deg" }],
  },
});
