import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Pressable, Keyboard, TextInput, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";

const AdminHomeScreen = ({navigation}) => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        Axios.get(url+"/get_all_staff").then((response) => {
            setTeachers(response.data.staff);
        })
    },[])

    const logout = () => {
        AsyncStorage.removeItem('loggedIn');
        navigation.navigate("SignUp");
    }

    const seeKids = () => {
        navigation.navigate("AddedKids");
    }

    const seeParents = () => {
        navigation.navigate("AddedParents");
    }

    const deleteTeacher = (teacher_id) => {
        Axios.delete(url+`/delete_teacher/${teacher_id}`);
    }

    const goToNotifications = () => {
        navigation.navigate("AdminNotifications");
    }

    const goToInvoices = () => {
        navigation.navigate("Invoices");
    }


    setInterval(() => {
        comingNotification();
    }, 10000);

    const comingNotification = () => {

        Axios.get(url+"/teacher_notification").then((Response) => {
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
            message:name+" left the school at "+notification_date
          })
    }

    return (
        <Pressable onPress={() => {Keyboard.dismiss()}} style={styles.container}>

            <View style={{flexDirection:'row', marginTop:70}}>
                <TouchableOpacity onPress={() => {logout()}} style={styles.logoutBtn}>
                    <Icon name="logout" size={20} color="#53A6FC"/>
                </TouchableOpacity>
                <Text style={styles.heading}>METSUYAN ADMIN</Text>
            </View>

            <View style={{flexDirection:'row', marginTop:30}}>
            <TouchableOpacity onPress={() => {seeKids()}} style={styles.seeKidBtn}>
                <Text style={styles.seeKidBtnText}>Kids</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {goToNotifications()}} style={styles.notBtn}>
                <Text style={styles.notBtnText}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {goToInvoices()}} style={styles.notBtn}>
                <Text style={styles.notBtnText}>Invoices</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {seeParents()}} style={styles.notBtn}>
                <Text style={styles.notBtnText}>Parents</Text>
            </TouchableOpacity>
            </View>

            <Text style={styles.staffHeading}>STAFF</Text>

            <FlatList
            showsVerticalScrollIndicator={true}
            data={teachers}
            renderItem={({item, index}) => {
                return(
                <View key={item.user_id} style={styles.kid}>
                <Text style={styles.kidName}>{item.name}</Text>
                <TouchableOpacity onPress={() => {deleteTeacher(item.user_id)}} style={styles.deleteBtn}>
                <Icon name="delete" size={25} color="#53A6FC"/>
                </TouchableOpacity>
            </View>
                )
            }}/>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#53A6FC',
    },

    heading:{
        color:'#fff',
        fontSize:25,
        marginLeft:20,
    },

    staffHeading:{
        color:'#fff',
        fontSize:25,
        marginTop:20
    },

    logoutBtn:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },

    seeKidBtn:{
        width:80,
        height:30,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },

    seeKidBtnText:{
        color:'#53A6FC',
        fontSize:13
    },

    notBtn:{
        width:80,
        height:30,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderLeftWidth:0.5,
        borderLeftColor:'gray'
    },

    notBtnText:{
        color:'#53A6FC',
        fontSize:13
    },

    kid:{
        marginTop:25,
        width:300,
        height:60,
        backgroundColor:'#fff',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center'
    },

    kidName:{
        color:'#53A6FC',
        fontSize:20,
        marginLeft:15
    },

    deleteBtn:{
        position:'absolute',
        left:250
    }
});

export default AdminHomeScreen;