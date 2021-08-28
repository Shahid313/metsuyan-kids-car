/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import KidsHomeScreen from './screens/KidsHomeScreen';
import StaffHomeScreen from './screens/StaffHomeScreen';
import ParentsHomeScreen from './screens/ParentsHomeScreen';
import AddedKidsScreen from './screens/AddedKidsScreen';
import ParentNotificationsScreen from './screens/ParentNotificationsScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{headerShown: false}} name="KidsHome" component={KidsHomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="StaffHome" component={StaffHomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="ParentsHome" component={ParentsHomeScreen} />
        <Stack.Screen options={{title:'Your Kids', headerTitleAlign:'center', headerTintColor:'#53A6FC'}} name="AddedKids" component={AddedKidsScreen} />
        <Stack.Screen options={{title:'Notifications', headerTitleAlign:'center', headerTintColor:'#53A6FC'}} name="ParentNotifications" component={ParentNotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
