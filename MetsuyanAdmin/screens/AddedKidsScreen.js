import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Pressable, Keyboard,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const AddedKidsScreen = () => {
    const [children, setChildren] = useState([]);

    useEffect(() => {
        Axios.get(url+`/get_all_kids`).then((response) => {
            setChildren(response.data.kids);

        });
    },[]);

    const deleteKid = (kid_id, index) => {
        Axios.delete(url+`/delete_kid/${kid_id}`);
        let c = children.splice(index, 1);
        console.log(c);
        setChildren(c);

    }

    return (
        <Pressable onPress={() => {Keyboard.dismiss()}} style={styles.container}>
            <FlatList
            showsVerticalscrollindicator={true}
            data={children}
            renderItem={({item, index}) => { return(
                <View style={styles.kid}>
                <Text style={styles.kidName}>{item.name}</Text>
                <TouchableOpacity onPress={() => {deleteKid(item.user_id, index)}} style={styles.deleteBtn}>
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
        fontSize:20,
        marginLeft:15
    },

    deleteBtn:{
        position:'absolute',
        left:250
    }
    
});

export default AddedKidsScreen;