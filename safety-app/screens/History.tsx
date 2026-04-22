import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Button, HistoryCard, ImageSet } from "../components";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { getEmergencyAlertHistory } from "../store/emergency/emergencySlice";
import { getAllComplaints } from "../store/complaints/complaintsSlice";
import { FlatList } from "react-native-gesture-handler";
import { IComplaint, IEmergency } from "../models";

export const History = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const complaints = useAppSelector(
    (state: RootState) => state.complaints.complaints
  );
  const emergencies = useAppSelector(
    (state: RootState) => state.emergencies.emergencies
  );

  const fetchData = async () => {
    await dispatch(getAllComplaints());
    await dispatch(getEmergencyAlertHistory());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isComplaintsActive, setIsComplaintsActive] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const toggleComplaints = () => {
    setIsComplaintsActive(!isComplaintsActive);
    setIsEmergencyActive(false); // Deactivate emergency
    // Add your logic for handling complaints here
  };

  const toggleEmergency = () => {
    setIsEmergencyActive(!isEmergencyActive);
    setIsComplaintsActive(false); // Deactivate complaints
    // Add your logic for handling emergencies here
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.white, COLORS.white]}
    >
      <View style={styles.container}>
        <View style={styles.toggleButtons}>
          <Button
            title="Complaints History"
            filled
            selected={isComplaintsActive}
            onPress={toggleComplaints}
          />

          <Button
            title="Emergency History"
            filled
            selected={isEmergencyActive}
            onPress={toggleEmergency}
          />
        </View>
        <ImageSet />
        <View style={{ paddingHorizontal: 30 }}>
          {isComplaintsActive ? (
            <FlatList
              data={complaints}
              keyExtractor={(item: IComplaint, index: number) => {
                return item.id.toString();
              }}
              renderItem={({
                item,
                index,
              }: {
                item: IComplaint;
                index: number;
              }) => {
                return <HistoryCard type="complaint" complaint={item} />;
              }}
              ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
              // ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
          ) : (
            <FlatList
              data={emergencies}
              keyExtractor={(item: IEmergency, index: number) => {
                return item.id.toString();
              }}
              renderItem={({
                item,
                index,
              }: {
                item: IEmergency;
                index: number;
              }) => {
                return <HistoryCard type="emergency" emergency={item} />;
              }}
              ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
              // ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginLeft: 8,
  },
});
