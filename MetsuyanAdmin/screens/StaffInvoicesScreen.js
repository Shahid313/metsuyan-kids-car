import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StaffInvoicesScreen = ({route}) => {
    const [invoices, setInvoices] = useState([]);
    const staff_id = route.params.staff_id;

    useEffect(() => {
        Axios.get(url+`/get_staff_invoices/${staff_id}`).then((response) => {
            setInvoices(response.data.kids_invoices);
        })
    }, [])
    return(
        <View style={styles.container}>
            <FlatList
            data={invoices}
            renderItem={({item,index}) => {
                return(
                    <View style={styles.invoice}>
                <Text style={styles.textData}>{item.name} {item.is_dropped ? (<Text>has dropped off at</Text>) : (<Text>has left at</Text>) } {item.notification_date}</Text>
                </View>
                )
            }}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#53A6FC'
    },

    invoice:{
        backgroundColor:'#fff',
        width:310,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },

    textData:{
        color:'black',
        fontSize:15,
    },
    name:{
        color:'#fff',
        fontSize:30,
        marginTop:10
    }
   
})

export default StaffInvoicesScreen;