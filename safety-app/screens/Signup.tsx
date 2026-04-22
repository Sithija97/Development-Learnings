import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { register, reset } from "../store/auth/authSlice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Second name is required"),
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  contactNumber: Yup.string().required("Contact No. is required"),
  nic: Yup.string().required("NIC is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  policeStationId: Yup.string().required(
    "Your relevant Police Staion is required"
  ),
});

export const Signup = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { user, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  useEffect(() => {
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigation, dispatch]);

  const handleSubmit = async (values: any, resetForm: any) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords are not matching, Please check your password !");
    } else {
      const {
        firstName,
        lastName,
        fullName,
        email,
        address,
        contactNumber,
        nic,
        password,
        policeStationId,
      } = values;
      try {
        const user = {
          firstName,
          lastName,
          fullName,
          email,
          address,
          contactNumber,
          nic,
          password,
          policeStationId: Number(policeStationId),
        };
        console.log(user);
        await dispatch(register(user)).then((data) => {
          if (data.meta.requestStatus === "fulfilled") {
            alert("User Registration Successful!");
            navigation.navigate("Login");
          }
        });

        resetForm();
      } catch (error) {
        console.log("registration error :", error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.baseViewContainer}>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.title}>Create Account</Text>
          </View>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              fullName: "",
              email: "",
              address: "",
              contactNumber: "",
              nic: "",
              password: "",
              confirmPassword: "",
              policeStationId: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, resetForm);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.nameInputContainer}>
                    <View style={styles.nameInput1}>
                      <Text style={styles.inputTitle}>First Name</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="first name"
                          placeholderTextColor={COLORS.black}
                          keyboardType="default"
                          style={{
                            width: "100%",
                          }}
                          onChangeText={handleChange("firstName")}
                          onBlur={handleBlur("firstName")}
                          value={values.firstName}
                        />
                      </View>
                      {touched.firstName && errors.firstName && (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                      )}
                    </View>

                    <View style={styles.nameInput2}>
                      <Text style={styles.inputTitle}>Second Name</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="last name"
                          placeholderTextColor={COLORS.black}
                          keyboardType="default"
                          style={{
                            width: "100%",
                          }}
                          onChangeText={handleChange("lastName")}
                          onBlur={handleBlur("lastName")}
                          value={values.lastName}
                        />
                      </View>
                      {touched.lastName && errors.lastName && (
                        <Text style={styles.errorText}>{errors.lastName}</Text>
                      )}
                    </View>
                  </View>

                  <Text style={styles.inputTitle}>Full name</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="full name"
                      placeholderTextColor={COLORS.black}
                      keyboardType="default"
                      style={{
                        width: "100%",
                      }}
                      onChangeText={handleChange("fullName")}
                      onBlur={handleBlur("fullName")}
                      value={values.fullName}
                    />
                  </View>
                  {touched.fullName && errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}

                  <Text style={styles.inputTitle}>Email address</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="email address"
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

                  <Text style={styles.inputTitle}>Address</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="address"
                      placeholderTextColor={COLORS.black}
                      keyboardType="default"
                      style={{
                        width: "100%",
                      }}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                  </View>
                  {touched.address && errors.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}

                  <View style={styles.nameInputContainer}>
                    <View style={styles.nameInput1}>
                      <Text style={styles.inputTitle}>Contact Number</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="contact No"
                          placeholderTextColor={COLORS.black}
                          keyboardType="phone-pad"
                          style={{
                            width: "100%",
                          }}
                          onChangeText={handleChange("contactNumber")}
                          onBlur={handleBlur("contactNumber")}
                          value={values.contactNumber}
                        />
                      </View>
                      {touched.contactNumber && errors.contactNumber && (
                        <Text style={styles.errorText}>
                          {errors.contactNumber}
                        </Text>
                      )}
                    </View>
                    <View style={styles.nameInput2}>
                      <Text style={styles.inputTitle}>NIC</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="NIC"
                          placeholderTextColor={COLORS.black}
                          keyboardType="default"
                          style={{
                            width: "100%",
                          }}
                          onChangeText={handleChange("nic")}
                          onBlur={handleBlur("nic")}
                          value={values.nic}
                        />
                      </View>
                      {touched.nic && errors.nic && (
                        <Text style={styles.errorText}>{errors.nic}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.nameInputContainer}>
                    <View style={styles.nameInput1}>
                      <Text style={styles.inputTitle}>Password</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="password"
                          placeholderTextColor={COLORS.black}
                          secureTextEntry={isPasswordShown}
                          style={{
                            width: "100%",
                          }}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          value={values.password}
                        />

                        <TouchableOpacity
                          onPress={() => setIsPasswordShown(!isPasswordShown)}
                          style={{
                            position: "absolute",
                            right: 12,
                          }}
                        >
                          {isPasswordShown == true ? (
                            <Ionicons
                              name="eye-off"
                              size={24}
                              color={COLORS.black}
                            />
                          ) : (
                            <Ionicons
                              name="eye"
                              size={24}
                              color={COLORS.black}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>
                    <View style={styles.nameInput2}>
                      <Text style={styles.inputTitle}>Confirm Password</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="confirm password"
                          placeholderTextColor={COLORS.black}
                          secureTextEntry={isPasswordShown}
                          style={{
                            width: "100%",
                          }}
                          onChangeText={handleChange("confirmPassword")}
                          onBlur={handleBlur("confirmPassword")}
                          value={values.confirmPassword}
                        />

                        <TouchableOpacity
                          onPress={() => setIsPasswordShown(!isPasswordShown)}
                          style={{
                            position: "absolute",
                            right: 12,
                          }}
                        >
                          {isPasswordShown == true ? (
                            <Ionicons
                              name="eye-off"
                              size={24}
                              color={COLORS.black}
                            />
                          ) : (
                            <Ionicons
                              name="eye"
                              size={24}
                              color={COLORS.black}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>
                      Select a Police Station:
                    </Text>
                    <Picker
                      selectedValue={values.policeStationId}
                      onValueChange={(itemValue: any, itemIndex) => {
                        handleChange("policeStationId")(itemValue);
                      }}
                      onBlur={handleBlur("policeStationId")}
                    >
                      <Picker.Item label="Maharagama" value="1" />
                      <Picker.Item label="Piliyandala" value="2" />
                      <Picker.Item label="Mirihana" value="3" />
                      <Picker.Item label="Homagama" value="4" />
                    </Picker>
                    {touched.policeStationId && errors.policeStationId && (
                      <Text style={styles.errorText}>
                        {errors.policeStationId}
                      </Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity onPress={() => handleSubmit()}>
                  <View style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Register</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Already have an account</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginButtonTitle}>Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 8,
  },
  nameInput1: {
    flex: 1,
    marginRight: 8,
  },
  nameInput2: {
    flex: 1,
    marginLeft: 8,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22,
  },
  loginTitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  loginButtonTitle: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: "bold",
    marginLeft: 6,
  },
  termsConditionsContainer: {
    flexDirection: "row",
    marginVertical: 6,
  },
  signupButton: {
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
    marginTop: 8, // Adjust the margin as needed
  },
  submitButtonText: {
    color: "white", // Change the text color to your preferred color
    fontSize: 18,
    fontWeight: "bold",
  },
});
