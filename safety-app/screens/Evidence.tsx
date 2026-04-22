import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { CameraButton, ImageSet } from "../components";

export const Evidence = ({ navigation }: any) => {
  const [startCamera, setStartCamera] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef<Camera | null>(null);

  const requestPermission = async () => {
    MediaLibrary.requestPermissionsAsync();
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === "granted");
    setStartCamera(true);
  };

  useEffect(() => {
    return () => {
      setStartCamera(false);
    };
  }, []);

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert("Picture saved! 🎉");
        setImage(null);
        console.log("saved successfully");
        setStartCamera(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync();
      console.log(data);
      if (data && data.uri) {
        setImage(data.uri);
      }
      try {
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <>
      {startCamera ? (
        <View style={styles.cameraViewContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            flashMode={flash}
          ></Camera>
          <View
            style={{
              flexDirection: image ? "row" : "column",
              justifyContent: "space-between",
              paddingHorizontal: 50,
              marginTop: 5,
            }}
          >
            <CameraButton
              title="Take a picture"
              icon="camera"
              onPress={takePicture}
              color={COLORS.black}
            />
            {image && (
              <CameraButton
                title="Save"
                onPress={savePicture}
                icon="check"
                color={COLORS.black}
              />
            )}
          </View>
        </View>
      ) : (
        <LinearGradient
          style={styles.container}
          colors={[COLORS.white, COLORS.white]}
        >
          <View style={styles.container}>
            <ImageSet />

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.writeTaskWrapper}
            >
              <TouchableOpacity onPress={requestPermission}>
                <View style={styles.addWrapper}>
                  <Ionicons name="add-outline" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraViewContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    paddingBottom: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  cameraButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
});
