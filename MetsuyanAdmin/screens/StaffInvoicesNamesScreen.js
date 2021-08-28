import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StaffInvoicesNamesScreen = ({navigation}) => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        Axios.get(url+"/get_staff_invoices_names").then((response) => {
            setInvoices(response.data.kids_invoices);
        })
    },[])

    const getInvoices = (staff_id) => {
        navigation.navigate("StaffInvoices",{'staff_id':staff_id});
    }
    return(
        <View style={styles.container}>
            
            <FlatList
            data={invoices}
            renderItem={({item,index}) => {
                return(
                    <TouchableOpacity onPress={() => {getInvoices(item.user_id)}} style={styles.invoice}>
                <Text style={styles.textData}>{item.name}</Text>
                </TouchableOpacity>
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
        height:50,
        alignItems:'center',
        marginTop:20
    },

    textData:{
        color:'black',
        fontSize:15,
        marginTop:15
    }
   
})

export default StaffInvoicesNamesScreen;