import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Button } from "../components/";

export const Welcome = ({ navigation }: any) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.secondary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../assets/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 20,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -20,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/hero2.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 140,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 120,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Let's Get</Text>
          <Text style={styles.subTitle}>Started</Text>
          <View style={{ marginVertical: 22 }}>
            <Text style={styles.description}>
              Connect with SafeHer and ensure your safety.
            </Text>
            <Text style={styles.description}>
              Because every women deserves to feel safe.
            </Text>
          </View>
          <Button
            title="Join Now"
            onPress={() => navigation.navigate("Signup")}
            style={styles.button}
          />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account ?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 22,
    position: "absolute",
    top: 500,
    width: "100%",
  },
  title: {
    fontSize: 50,
    fontWeight: "800",
    color: COLORS.white,
  },
  subTitle: {
    fontSize: 46,
    fontWeight: "800",
    color: COLORS.white,
  },
  description: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 4,
  },
  button: {
    backgroundColor: COLORS.white,
    marginTop: 22,
    width: "100%",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: COLORS.white,
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
    marginLeft: 4,
  },
});
