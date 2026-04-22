import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { forgotPassword, login, reset, verify } from "../store/auth/authSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { IForgotPWData, IVerifyUserData } from "../models";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const initialState = {
  email: "",
};

export const ForgetPassword = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { user, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth
  );
  React.useEffect(() => {
    const backAction = () => {
      navigation.navigate("Login");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const handleSubmit = async (values: any, resetForm: any) => {
    const { email } = values;
    const data: IForgotPWData = { email };
    try {
      await dispatch(forgotPassword(data)).then(
        (data: any) =>
          data.meta.requestStatus === "fulfilled" &&
          navigation.navigate("ResetPassword")
      );
      resetForm();
    } catch (error) {
      console.log("Forget Password error :", error);
    }
  };

  if (isError) {
    alert(message);
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.baseViewContainer}>
        <View style={{ marginVertical: 22 }}>
          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.subtitle}>Connect with your friend today!</Text>
        </View>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputTitle}>Email address</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor={COLORS.black}
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                    }}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <TouchableOpacity onPress={() => handleSubmit()}>
                <View style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>
                    Verify with New Password
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  baseViewContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 8,
  },
  inputContainer: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  passwordVisibleIcon: {
    position: "absolute",
    right: 12,
  },
  loginButton: {
    marginTop: 18,
    marginBottom: 4,
  },
  errorText: {
    color: "red", // You can change the color to your preferred error color
    fontSize: 14, // You can adjust the font size as needed
    marginTop: 5, // Add some spacing from the input field
  },
  submitButton: {
    backgroundColor: COLORS.secondary, // Change the background color to your preferred color
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20, // Adjust the margin as needed
  },
  submitButtonText: {
    color: "white", // Change the text color to your preferred color
    fontSize: 18,
    fontWeight: "bold",
  },
});
