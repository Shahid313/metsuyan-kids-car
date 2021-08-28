import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const InvoicesScreen = ({navigation}) => {

    const kidsInvoices = () => {
        navigation.navigate("InvoicesNames");
    }

    const staffInvoices = () => {
        navigation.navigate("StaffInvoicesNames");
    }

    return(
        <View style={styles.container}>

            <View style={{flexDirection:'row', marginTop:50}}>
                <TouchableOpacity onPress={() => {kidsInvoices()}} style={styles.dropBtn}>
                    <Text style={styles.dropBtnText}>Kids Invoices</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {staffInvoices()}} style={styles.leftBtn}>
                    <Text style={styles.dropBtnText}>Staff Invoices</Text>
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
        width:130,
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
        width:130,
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
})

export default InvoicesScreen;