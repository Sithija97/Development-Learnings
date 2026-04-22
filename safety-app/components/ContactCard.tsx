import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { IContactPersonData } from "../models";

interface IProps {
  index: number;
  item: IContactPersonData;
  onDelete: (index: number) => void;
}

export const ContactCard = ({ index, item, onDelete }: IProps) => {
  const { contactNumber, contactPersonsName, email } = item;
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>
          {contactPersonsName} - {contactNumber}
        </Text>
      </View>
      <View>
        <MaterialIcons
          name="delete"
          size={24}
          color={COLORS.blue}
          onPress={() => onDelete(index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    elevation: 5,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.secondary,
    // opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});
