import React,{useState, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet, Pressable, Keyboard, TouchableOpacity} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Axios from 'axios';
import url from '../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

_retrieveData = async (navigation) => {

    const value = await AsyncStorage.getItem('loggedIn');
    const parse = JSON.parse(value)
    if (parse != null) {
        if(parse.kid == true){
            navigation.navigate("KidsHome");
        }else if(parse.parent == true){
            navigation.navigate("ParentsHome");
        }else if(parse.staff == true){
            navigation.navigate("StaffHome");
        }
    }else{
        return false
    }
  
};

const radioButtonsData = [
    {
      id: '1',
      label: 'Staff Member',
      value: 'staff',
      color: '#fff',
      selected: false,
      labelStyle:{color:'#fff', fontSize:20}
    },
    {
      id: '2',
      label: 'Parent',
      value: 'parent',
      color: '#fff',
      selected: false,
      labelStyle:{color:'#fff', fontSize:20}
    },
  ];

const SignUpScreen = ({navigation}) => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
       
        _retrieveData(navigation)
     },[])

    const onPressRadioButton = radioButtonsArray => {
        console.log(radioButtonsArray);
        setRadioButtons(radioButtonsArray);
      };

      const signup = () => {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        radioButtons.map((radioBtn) => {
            if(radioBtn.selected == true && radioBtn.value == 'staff'){
                data.append('status', radioBtn.value);
            }else if(radioBtn.selected == true && radioBtn.value == 'parent'){
                data.append('status', radioBtn.value)
            }
        })

        Axios.post(url+"/signup", data);
        navigation.navigate("SignIn");

      }

      const signin = () => {
          navigation.navigate("SignIn");
      }

    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
            <View style={{flexDirection:'row', marginTop:70}}>
                <Text style={styles.heading}>METSUYAN CARE</Text>
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

            <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout="row"
            containerStyle={styles.radioGroupBtns}
            />

            <TouchableOpacity onPress={() => {signup()}} style={styles.signUpBtn}>
                <Text style={styles.signUpBtnText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={{color:'#fff', marginTop:20}}>Already have an account?</Text>
            
            <TouchableOpacity onPress={() => {signin()}} style={styles.signInBtn}>
                <Text style={styles.signInBtnText}>Sign In</Text>
            </TouchableOpacity>

                <View style={{marginTop:20, marginLeft:30}}>
                  <Text style={{color:'#fff', marginLeft:20}}>If you are a student please</Text>
                  <Text style={{color:'#fff', marginLeft:10}}>signin with the information with</Text>
                  <Text style={{color:'#fff', marginRight:27}}>which you have added by your parent</Text>
                </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#53A6FC'
    },

    logoutBtn:{
        width:30,
        height:30,
        borderRadius:15,
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

    radioGroupBtns:{
        marginTop:35
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
        fontSize:18
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