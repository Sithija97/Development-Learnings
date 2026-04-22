import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Linking,
} from "react-native";
import * as location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Button, ImageSetTwo } from "../components";
import { useAppDispatch } from "../store/store";
import { notifyEmergencyAlert } from "../store/emergency/emergencySlice";
import { getAllCommunityPosts } from "../store/community/communitySlice";
import { FontAwesome } from "@expo/vector-icons";
import { logout } from "../store/auth/authSlice";
import { getContactList } from "../store/contacts/contactsSlice";

export const Home = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await dispatch(getAllCommunityPosts());
    await dispatch(getContactList());
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("DrawerGroup");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const sendUserLocation = async () => {
    let { status } = await location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied!");
    }
    let userLocation = await location.getCurrentPositionAsync({
      accuracy: location.Accuracy.High,
    });

    console.log("latitude:", userLocation.coords.latitude);
    console.log("longitude:", userLocation.coords.longitude);

    const emergencyData = {
      lat: String(userLocation.coords.latitude),
      long: String(userLocation.coords.longitude),
    };

    await dispatch(notifyEmergencyAlert(emergencyData)).then(
      (data) =>
        data.meta.requestStatus === "fulfilled" &&
        alert("Notified your family!")
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const makePhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.white, COLORS.white]}
    >
      <View style={styles.container}>
        <ImageSetTwo />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button
            title="Inform your family"
            color={COLORS.secondary}
            filled
            selected
            onPress={sendUserLocation}
            style={{ marginTop: 22, width: "100%" }}
          />
          <Button
            title="Womens Help Line"
            color={COLORS.secondary}
            filled
            selected
            onPress={() => makePhoneCall("1938")}
            style={{ marginTop: 22, width: "100%" }}
          />
          <Button
            title="Child Protection"
            color={COLORS.secondary}
            filled
            selected
            onPress={() => makePhoneCall("1929")}
            style={{ marginTop: 22, width: "100%" }}
          />
          <Button
            title="Police Emergency"
            color={COLORS.secondary}
            filled
            selected
            onPress={() => makePhoneCall("119")}
            style={{ marginTop: 22, width: "100%" }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 22,
    position: "absolute",
    top: 440,
    width: "100%",
  },
  logoutButton: {
    position: "absolute",
    top: 0,
    right: 40,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 10,
  },
});
