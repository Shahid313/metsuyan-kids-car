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
 import AdminHomeScreen from './screens/AdminHomeScreen';
 import AddedKidsScreen from './screens/AddedKidsScreen';
 import AddedParentsScreen from './screens/AddedParentsScreen';
 import NotificationsScreen from './screens/NotificationsScreen';
 import InvoicesScreen from './screens/InvoicesScreen';
 import KidsInvoicesScreen from './screens/KidsInvoicesScreen';
 import StaffInvoicesScreen from './screens/StaffInvoicesScreen';
 import InvoicesNamesScreen from './screens/InvoicesNamesScreen';
 import StaffInvoicesNamesScreen from './screens/StaffInvoicesNamesScreen';
 
 
 
 
 
 const Stack = createNativeStackNavigator();
 
 const App = () => {
   return(
     <NavigationContainer>
       <Stack.Navigator initialRouteName="SignUp">
         <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
         <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
         <Stack.Screen options={{headerShown: false}} name="AdminHome" component={AdminHomeScreen} />
         <Stack.Screen options={{title:"KIDS", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="AddedKids" component={AddedKidsScreen} />
         <Stack.Screen options={{title:"Parents", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="AddedParents" component={AddedParentsScreen} />
         <Stack.Screen options={{title:"Notifications", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="AdminNotifications" component={NotificationsScreen} />
         <Stack.Screen options={{title:"Invoices", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="Invoices" component={InvoicesScreen} />
         <Stack.Screen options={{title:"Kids Invoices", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="KidsInvoices" component={KidsInvoicesScreen} />
         <Stack.Screen options={{title:"Staff Invoices", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="StaffInvoices" component={StaffInvoicesScreen} />
         <Stack.Screen options={{title:"Kids", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="InvoicesNames" component={InvoicesNamesScreen} />
         <Stack.Screen options={{title:"Kids", headerTintColor:'#53A6FC', headerTitleAlign:'center'}} name="StaffInvoicesNames" component={StaffInvoicesNamesScreen} />
       </Stack.Navigator>
     </NavigationContainer>
   )
 }
 
 export default App;
 
