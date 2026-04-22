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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Button, ContactCard, ImageSet } from "../components";
import { IContactPersonData } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import {
  createContactList,
  getContactList,
} from "../store/contacts/contactsSlice";

const initialState = {
  contactPersonsName: "",
  address: "",
  contactNumber: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  contactPersonsName: Yup.string(),
  address: Yup.string(),
  contactNumber: Yup.string(),
  email: Yup.string().email("Invalid email address"),
});

export const Contacts = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { contacts, isLoading } = useAppSelector(
    (state: RootState) => state.contacts
  );

  const fetchData = async () => {
    await dispatch(getContactList());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [contactsGroup, setContactsGroup] = useState<IContactPersonData[]>(
    contacts || []
  );

  const handleSubmit = (values: any, resetForm: any) => {
    if (
      values.contactPersonsName &&
      values.address &&
      values.contactNumber &&
      values.email
    ) {
      const { contactPersonsName, address, contactNumber, email } = values;
      const person = { contactPersonsName, address, contactNumber, email };
      setContactsGroup([...contactsGroup, person]);
      resetForm();

      Keyboard.dismiss();
    }
  };

  const saveContactDetails = async () => {
    await dispatch(
      createContactList({
        userContactPersonData: contactsGroup,
      })
    ).then(
      (data: any) =>
        data.meta.requestStatus === "fulfilled" &&
        alert("Contacts added Successfully!")
    );
  };

  const deleteContact = (index: number) => {
    const updatedContactsGroup = [...contactsGroup];
    updatedContactsGroup.splice(index, 1);
    setContactsGroup(updatedContactsGroup);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.white, COLORS.white]}
    >
      <View style={styles.container}>
        <ImageSet />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {contactsGroup.map((item, index) => {
                return (
                  // <TouchableOpacity key={index}>
                  <ContactCard
                    key={index}
                    index={index}
                    item={item}
                    onDelete={() => deleteContact(index)}
                  />
                  // </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.writeTaskWrapper}>
                  <View style={{ marginVertical: 20 }}>
                    <TextInput
                      style={styles.input}
                      placeholder={"Add contact name"}
                      onChangeText={handleChange("contactPersonsName")}
                      onBlur={handleBlur("contactPersonsName")}
                      value={values.contactPersonsName}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder={"Add address"}
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder={"Add mobile number"}
                      keyboardType="phone-pad"
                      onChangeText={handleChange("contactNumber")}
                      onBlur={handleBlur("contactNumber")}
                      value={values.contactNumber}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder={"Add email address"}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                  </View>
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={styles.addWrapper}>
                      <Ionicons name="add-outline" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.submitButtonContainer}>
                  <Button
                    title={"Save Contacts"}
                    selected
                    filled
                    disabled={contactsGroup.length < 5}
                    onPress={() => saveContactDetails()}
                  />
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: COLORS.black,
    borderWidth: 1,
    width: 290,
    marginBottom: 5,
    height: 45,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 83,
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.grey,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButtonContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
