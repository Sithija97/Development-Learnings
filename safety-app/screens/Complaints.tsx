import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Button, ImageSet } from "../components";
import { Picker } from "@react-native-picker/picker";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { createComplaints } from "../store/complaints/complaintsSlice";
import { IComplaintData } from "../models";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  complaint: Yup.string().required("complaint is required"),
  policeStationId: Yup.string().required("Police Staion is required"),
  category: Yup.string().required("category is required"),
});

export const Complaints = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleSubmit = async (values: any, resetForm: any) => {
    const { title, policeStationId, complaint, category } = values;
    const complaintData: IComplaintData = {
      title,
      policeStationId: Number(policeStationId),
      complaint,
      category: Number(category),
      userId: user?.id,
    };
    await dispatch(createComplaints(complaintData)).then(
      (data) =>
        data.meta.requestStatus === "fulfilled" &&
        alert("Complaint added Successfully!")
    );
    resetForm();
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.white, COLORS.white]}
    >
      <View style={styles.container}>
        <ImageSet />

        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.title}>Create Complaint</Text>

          <Text style={styles.subtitle}>Send your complaint here!</Text>

          <Formik
            initialValues={{
              title: "",
              policeStationId: "",
              complaint: "",
              category: "",
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
                <View style={{ marginVertical: 20 }}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Enter your title here "
                      placeholderTextColor={COLORS.black}
                      keyboardType="default"
                      style={{
                        width: "100%",
                      }}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      value={values.title}
                    />
                  </View>
                </View>

                <View>
                  <Text style={styles.inputTitle}>Select category:</Text>
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(itemValue: any, itemIndex) => {
                      handleChange("category")(itemValue);
                    }}
                    onBlur={handleBlur("category")}
                  >
                    <Picker.Item label="Domestic violence" value="1" />
                    <Picker.Item
                      label="Verbal and physical aggression"
                      value="2"
                    />
                    <Picker.Item label="Sexual harassment" value="3" />
                    <Picker.Item label="Attempt to Rape" value="4" />
                  </Picker>
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
                </View>

                <View style={styles.textareaContainer}>
                  <TextInput
                    placeholder="Enter your complaint here "
                    placeholderTextColor={COLORS.black}
                    keyboardType="default"
                    multiline={true}
                    numberOfLines={10}
                    style={{
                      width: "100%",
                      height: 150,
                    }}
                    onChangeText={handleChange("complaint")}
                    onBlur={handleBlur("complaint")}
                    value={values.complaint}
                  />
                </View>

                <View style={styles.submitButtonContainer}>
                  <Button
                    title="Send Complaint"
                    filled
                    selected
                    disabled={!values.title || !values.complaint}
                    onPress={() => handleSubmit()}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputTitle: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 8,
  },
  textareaContainer: {
    width: "100%",
    height: 150,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  submitButtonContainer: {
    marginTop: 20,
  },
});
