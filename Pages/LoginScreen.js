import {useState,useContext} from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import {UserIcon,LockClosedIcon } from 'react-native-heroicons/outline'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../context/AuthContext';

const Logincreen = () => {
  const { login } = useContext(AuthContext);
  const navigation=useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => { 
    {/*const userData = {
      email,
      password
    }
    console.log(userData);
    axios.post("http://172.20.10.5:5000/api/auth/login",userData)
    .then(res=>
      {
        if(res.data.message == "token sent successful"){
          console.log(res.data);
          AsyncStorage.setItem('token',res.data.token);
          navigation.navigate('homescreen');
        }
      })*/}
  }

  return (
    <SafeAreaView style={styles.safeArea}>
     <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle}/>
          <Text style={styles.logoText} >
            Welcome back kindly sign in to access {"\n"}your account.
          </Text>
      </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <UserIcon color="black" size={20} style={styles.sideIcon}/>
            <TextInput value={email} onChangeText={(text)=>setEmail(text)} style={styles.input}/>
          </View>
          <View style={styles.inputGroup}>
            <LockClosedIcon color="black" size={20} style={styles.sideIcon}/>
            <TextInput value={password} onChangeText={(text)=>setPassword(text)} style={styles.input}/>
          </View>
        </View>
        <View style={styles.loginGroup}>
          <Text style={styles.resetPwd}>Click the link below to reset login credentials {"\n"} Forgot Password</Text>
          <TouchableOpacity style={styles.registerBtn} onPress={()=>{login(email,password)}}>
             <Text style={{color:"#fff",fontSize:16}}>Log In</Text>
          </TouchableOpacity>
          <Pressable onPress={()=>navigation.navigate('signIn')}>
          <Text style={styles.signTxt}>Dont have an account? Sign Up </Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    flex:1,
    backgroundColor: "#fff",
    alignItems:"center"
  },
  logoContainer:{
    width:"75%",
    height:"20%",
    display: "flex",
    flexDirection:"column",
    gap:"0.3%",
    alignItems:"center",
    justifyContent:"space-between",
  },
  logoText:{
    textAlign:'center',
    width:"95%",
    color: "#6E6D7A",
  },
  formContainer:{
    width:"100%",
    height:"25%",
    marginTop:"2%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  inputGroup:{
   backgroundColor:"#ECECEC",
   width:"85%",
   height:"33%",
   borderRadius:5,
   display:"flex",
   flexDirection:'row',
   alignItems:"center",
   justifyContent:"space-between"
  },
  sideIcon:{
   marginLeft:"4%"
  },
  registerBtn:{
   width:"100%",
   height:"30%",
   backgroundColor:"#1C3530",
   borderRadius:5,
   display:"flex",
   justifyContent:"center",
   alignItems:"center"
  },
  input:{
   width:"90%",
   height:"90%",
   borderRadius:10,
   fontSize:18,
   marginLeft:"2%"
  },
  loginGroup:{
    position:'absolute',
    width:"90%",
    marginBottom:0,
    top:"70%",
    height:"30%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  resetPwd:{
    color: "#6E6D7A",
    textAlign:"center"
  }
});


export default Logincreen;
