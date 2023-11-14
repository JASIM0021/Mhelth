import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screen/Home";
import Welcome from "../screen/Welcome/Welcome";
import Thankyou from "../screen/Thankyou";
import NavigationString from "../constant/NavigationString";
const Router = () => {
    const Stack = createNativeStackNavigator();
  return (

        <Stack.Navigator initialState={NavigationString.Welcome}screenOptions={{
          headerShown:false
        }}>
       <Stack.Screen name={NavigationString.Welcome}  component={Welcome}/>
        <Stack.Screen name={NavigationString.Home} component={Home}/>
        <Stack.Screen name={NavigationString.Thankyou} component={Thankyou}/>
        </Stack.Navigator>
  
  );
};

export default Router;

const styles = StyleSheet.create({});
