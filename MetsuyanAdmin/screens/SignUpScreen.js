import React,{useState,useEffect} from 'react';
import {Text, View, TextInput, StyleSheet, Pressable, Keyboard, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

_retrieveData = async (navigation) => {

    const value = await AsyncStorage.getItem('loggedIn');
    const parse = JSON.parse(value)
    if (parse != null) {
        if(parse.admin == true){
            navigation.navigate("AdminHome");
        }
    }else{
        return false
    }
  
};

const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
       
        _retrieveData(navigation)
     },[])

    const signUp = () => {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);

        Axios.post(url+"/admin_signup", data);
        navigation.navigate("SignIn");
    }

    const signin = () => {
        navigation.navigate("SignIn");
    }

    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
            <View style={{flexDirection:'row', marginTop:70}}>
                <Text style={styles.heading}>METSUYAN ADMIN</Text>
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
            secureTextEntry={true}
            onChangeText={(e) => {setPassword(e)}}
            />

            <TouchableOpacity onPress={() => {signUp()}} style={styles.signUpBtn}>
                <Text style={styles.signUpBtnText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={{color:'#fff', marginTop:20}}>Already have an account?</Text>
            
            <TouchableOpacity onPress={() => {signin()}} style={styles.signInBtn}>
                <Text style={styles.signInBtnText}>Sign In</Text>
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

    heading:{
        color:'#fff',
        fontSize:25,
        fontWeight:'bold'

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

    signUpBtn:{
        width:250,
        height:50,
        borderRadius:25,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginTop:33
    },

    signUpBtnText:{
        color:'#53A6FC',
        fontSize:15
    },

    signInBtn:{
        width:100,
        height:40,
        borderRadius:25,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginTop:27
    },

    signInBtnText:{
        color:'#53A6FC',
        fontSize:15
    }
});

export default SignUpScreen;