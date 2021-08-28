import React,{useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KidsHomeScreen = ({navigation}) => {

    const logout = () => {
        AsyncStorage.removeItem('loggedIn');
        navigation.navigate("SignUp");
    }

    const onDropped = async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)

        Axios.post(url+`/kid_dropped/${parse.user_id}/${parse.parent_id}`);
    }

    const onLeft = async () => {
        const value = await AsyncStorage.getItem('loggedIn');
        const parse = JSON.parse(value)

        Axios.post(url+`/kid_left/${parse.user_id}/${parse.parent_id}`);
    }

    return (
        <View style={styles.container}>

            <View style={{flexDirection:'row', marginTop:70}}>
                <TouchableOpacity onPress={() => {logout()}} style={styles.logoutBtn}>
                    <Icon name="logout" size={20} color="#53A6FC"/>
                </TouchableOpacity>
                <Text style={styles.heading}>METSUYAN KIDS</Text>
            </View>

            <View style={{flexDirection:'row', marginTop:50}}>
                <TouchableOpacity onPress={() => {onDropped()}} style={styles.dropBtn}>
                    <Text style={styles.dropBtnText}>Dropped</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {onLeft()}} style={styles.leftBtn}>
                    <Text style={styles.dropBtnText}>Left</Text>
                </TouchableOpacity>
            </View>
        </View>
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

    dropBtnText:{
        color:'#53A6FC',
        fontSize:17
    },

    leftBtn:{
        width:100,
        height:40,
        borderRadius:25,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:25
    },

    leftBtnText:{
        color:'#53A6FC',
        fontSize:17
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
    }
});

export default KidsHomeScreen;