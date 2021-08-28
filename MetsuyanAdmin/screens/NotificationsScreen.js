import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Pressable, Keyboard,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const NotificationsScreen = () => {
    const [children, setChildren] = useState([]);

    useEffect(() => {
        Axios.get(url+"/get_teachers_notifications").then((response) => {
            setChildren(response.data.notifications);

        });
    },[]);

    const deleteNotification = (notification_id) => {
        Axios.delete(url+`/delete_teacher_notification/${notification_id}`);
        
        Axios.get(url+"/get_teachers_notifications").then((response) => {
            setChildren(response.data.notifications);

        });
    }

    return (
        <Pressable onPress={() => {Keyboard.dismiss()}} style={styles.container}>
            <FlatList
            showsVerticalscrollindicator={true}
            data={children}
            renderItem={({item, index}) => { return(
                <View style={styles.kid}>
                <Text style={styles.kidName}>{item.name} {item.is_dropped ? (<Text>has dropped off at</Text>) : (<Text>has left at</Text>) }  {item.notification_date}</Text>
                <TouchableOpacity onPress={() => {deleteNotification(item.notifcation_id)}} style={styles.deleteBtn}>
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
        backgroundColor:'#53A6FC'
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
        fontSize:15,
        marginLeft:15
    },

    deleteBtn:{
        position:'absolute',
        left:250
    }
    
});

export default NotificationsScreen;