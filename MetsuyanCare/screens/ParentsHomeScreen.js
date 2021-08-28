import React,{useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Pressable, Keyboard, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";

const ParentsHomeScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    setInterval(() => {
        comingNotification();
    }, 10000);

    const comingNotification = async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)

        Axios.get(url+`/kid_notification/${parse.user_id}`).then((Response) => {
            if(Response.data.isFound == true){
                Response.data.notification.map((n) => {
                    if(n.is_dropped == true){
                        dropNotification(n.name,n.notification_date);
                    }else{
                        leftNotification(n.name,n.notification_date);
                    }
                })
            }
        })
    }

    function dropNotification(name,notification_date){
        PushNotification.localNotification({
            channelId:"test-channel",
            title:name+" Dropped",
            message:name+" dropped in school at "+notification_date
          })
    }

    function leftNotification(name,notification_date){
        PushNotification.localNotification({
            channelId:"test-channel",
            title:name+" Left",
            message:name+" left the school at "+ notification_date
          })
    }

    const addedKids = () => {
        navigation.navigate("AddedKids");
    }

    const logout = () => {
        AsyncStorage.removeItem('loggedIn');
        navigation.navigate("SignUp");
    }

    const addKid = async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);

        Axios.post(url+`/add_kid/${parse.user_id}`, data);

    }

    const goToNotifications = () => {
        navigation.navigate("ParentNotifications");
    }

    return (
        <Pressable onPress={() => {Keyboard.dismiss()}} style={styles.container}>

            <View style={{flexDirection:'row', marginTop:70}}>
                <TouchableOpacity onPress={() => {logout()}} style={styles.logoutBtn}>
                    <Icon name="logout" size={20} color="#53A6FC"/>
                </TouchableOpacity>
                <Text style={styles.heading}>METSUYAN PARENTS</Text>
            </View>

            <View style={{flexDirection:'row', marginTop:30}}>
            <TouchableOpacity onPress={() => {addedKids()}} style={styles.seeKidBtn}>
                <Text style={styles.seeKidBtnText}>Your Kids</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {goToNotifications()}} style={styles.notBtn}>
                <Text style={styles.notBtnText}>Notifications</Text>
            </TouchableOpacity>
            </View>

            <TextInput 
            style={styles.nameInput} 
            placeholder="Enter Name"
            placeholderTextColor="#fff"
            onChangeText={(e) => {setName(e)}}

            />

            <TextInput 
            style={styles.emailInput} 
            placeholder="Enter Email"
            placeholderTextColor="#fff"
            onChangeText={(e) => {setEmail(e)}}
            />

            <TextInput 
            style={styles.passwordInput} 
            placeholder="Enter Password"
            placeholderTextColor="#fff"
            onChangeText={(e) => {setPassword(e)}}
            />

            <TouchableOpacity onPress={() => {addKid()}} style={styles.addKidBtn}>
                <Text style={styles.addKidBtnText}>Add Kid</Text>
            </TouchableOpacity>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#53A6FC'
    },
    dropBtn:{
        width:100,
        height:40,
        borderRadius:25,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },

    heading:{
        color:'#fff',
        fontSize:25,
        marginLeft:20
    },

    logoutBtn:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },

    nameInput:{
        height:60,
        width:300,
        marginTop:60,
        borderBottomWidth: 1,
        borderColor:'#fff',
        color:'white',
        fontSize:22,
    },

    emailInput:{
        height:60,
        width:300,
        marginTop:15,
        borderBottomWidth: 1,
        borderColor:'#fff',
        color:'white',
        fontSize:22,
    },

    passwordInput:{
        height:60,
        width:300,
        marginTop:15,
        borderBottomWidth: 1,
        borderColor:'#fff',
        color:'white',
        fontSize:22,
    },
    addKidBtn:{
        width:210,
        height:50,
        borderRadius:25,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginTop:33
    },
    addKidBtnText:{
        color:'#53A6FC',
        fontSize:20
    },

    seeKidBtn:{
        width:100,
        height:40,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },

    seeKidBtnText:{
        color:'#53A6FC',
        fontSize:17
    },

    notBtn:{
        width:120,
        height:40,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderLeftWidth:0.5,
        borderLeftColor:'gray'
    },

    notBtnText:{
        color:'#53A6FC',
        fontSize:17
    }
});

export default ParentsHomeScreen;