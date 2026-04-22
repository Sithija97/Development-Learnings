import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafetyTip } from "../data/safetyTips";

export const Card = ({ safetyTip }: { safetyTip: SafetyTip }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.header}>{safetyTip.title}</Text>
      <Text style={styles.body}>{safetyTip.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
  },
});
