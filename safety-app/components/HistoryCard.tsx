import React from "react";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import { IComplaint, IEmergency } from "../models";
import { ComplaintCategory } from "../enums";

interface IProps {
  type: "complaint" | "emergency";
  complaint?: IComplaint;
  emergency?: IEmergency;
}

export const HistoryCard = ({ type, complaint, emergency }: IProps) => {
  const getCategoryText = (categoryValue: number) => {
    switch (categoryValue) {
      case ComplaintCategory.DomesticViolence:
        return "Domestic violence";
      case ComplaintCategory.VerbalAndPhysicalAggression:
        return "Verbal and physical aggression";
      case ComplaintCategory.SexualHarassment:
        return "Sexual harassment";
      case ComplaintCategory.AttemptToRape:
        return "Attempt to Rape";
      default:
        return "Unknown Category";
    }
  };

  return (
    <View style={styles.card}>
      {type === "complaint" ? (
        <>
          <Text style={styles.title}>{complaint?.title}</Text>
          <Text style={styles.category}>{`Category: ${getCategoryText(
            complaint?.category!
          )}`}</Text>
          <Text style={styles.createdAt}>{`Created At: ${moment(
            complaint?.createdAt
          ).format("YYYY.MM.DD")}`}</Text>
          <Text style={styles.updatedAt}>{`Updated At: ${moment(
            complaint?.updatedAt
          ).format("YYYY.MM.DD")}`}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Emergency Alert</Text>
          <Text
            style={styles.description}
          >{`Faced an emergency situation on ${moment(
            emergency?.createdAt
          ).format("YYYY.MM.DD")}`}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  category: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  createdAt: {
    fontSize: 14,
    color: "gray",
  },
  updatedAt: {
    fontSize: 14,
    color: "gray",
  },
});
