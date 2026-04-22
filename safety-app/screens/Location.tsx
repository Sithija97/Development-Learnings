import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as location from "expo-location";
import { StyleSheet, View, Text } from "react-native";

export const Location = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.927079,
    longitude: 79.861244,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserLocation = async () => {
    let { status } = await location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied!");
    }
    let userLocation = await location.getCurrentPositionAsync({
      accuracy: location.Accuracy.High,
    });
    setMapRegion({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
