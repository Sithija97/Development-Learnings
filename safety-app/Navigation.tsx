import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Evidence,
  Home,
  Login,
  Signup,
  Tips,
  Welcome,
  Contacts,
  History,
  Complaints,
  Location,
  Community,
  Profile,
  ResetPassword,
  ForgetPassword,
} from "./screens";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

// Stack
const HomeStack = createStackNavigator();

const HomeStackGroup = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Welcome" component={Welcome} />
      <HomeStack.Screen name="Signup" component={Signup} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <HomeStack.Screen name="ResetPassword" component={ResetPassword} />
      <HomeStack.Screen name="DrawerGroup" component={DrawerGroup} />
    </HomeStack.Navigator>
  );
};

// Drawer
const Drawer = createDrawerNavigator();

const DrawerGroup = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"home"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"person"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Contacts"
        component={Contacts}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"person-add"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Community"
        component={Community}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"people"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Evidence"
        component={Evidence}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"camera"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="  Location"
        component={Location}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome5 name={"map-marker-alt"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Complaints"
        component={Complaints}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome5 name={"pencil-alt"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome5 name={"history"} size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Safety Tips"
        component={Tips}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"bulb"} size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeStackGroup />
    </NavigationContainer>
  );
};

export default Navigation;
