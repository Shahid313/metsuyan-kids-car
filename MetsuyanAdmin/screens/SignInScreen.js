import React,{useState, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet, Pressable, Keyboard, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState(false);

    const signup = () => {
        navigation.navigate("SignUp");
    }

    const signin = async () => {
        const Data = new FormData();
        Data.append('email', email);
        Data.append('password', password);

        await  Axios.post(url+"/signin", Data).then((response) => {
            if(response.data.loggedIn == true){
                       AsyncStorage.setItem(
                        'loggedIn',
                        JSON.stringify(response.data.user)
                      );
                 if(response.data.user.admin == true){
                     navigation.navigate("AdminHome");
                 }else {
                     return false;
                 }
            }else{
                setIncorrect(true);
            }
        });
    }

    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
            <View style={{flexDirection:'row', marginTop:70}}>
                <Text style={styles.heading}>METSUYAN ADMIN</Text>
            </View>

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

            <TouchableOpacity onPress={() => {signin()}} style={styles.signUpBtn}>
                <Text style={styles.signUpBtnText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={{color:'#fff', marginTop:20}}>Don't have an account?</Text>
            
            <TouchableOpacity onPress={() => {signup()}} style={styles.signInBtn}>
                <Text style={styles.signInBtnText}>Sign Up</Text>
            </TouchableOpacity>

            {incorrect ? (<Text style={{marginTop:30, fontSize:15, color:'pink'}}>The Email or Password is Incorrect</Text>) : null}

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

export default SignInScreen;