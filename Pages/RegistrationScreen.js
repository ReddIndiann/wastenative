
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import {UserIcon,HashtagIcon,EnvelopeIcon,LockClosedIcon } from 'react-native-heroicons/outline'

const RegistrationScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle}/>
          <Text style={styles.logoText} >Let's get you started. Create an account to start with us</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <UserIcon color="black" size={20} style={styles.sideIcon}/>
            <TextInput style={styles.input}/>
          </View>
          <View style={styles.inputGroup}>
            <HashtagIcon color="black" size={20} style={styles.sideIcon}/>
            <TextInput style={styles.input}/>
          </View>
          <View style={styles.inputGroup}>
          <EnvelopeIcon color="black" size={20} style={styles.sideIcon}/>
          <TextInput style={styles.input}/>
          </View>
          <View style={styles.inputGroup}>
          <LockClosedIcon color="black" size={20} style={styles.sideIcon}/>
          <TextInput style={styles.input}/>
          </View>
          <View style={styles.inputGroup}>
          <LockClosedIcon color="black" size={20} style={styles.sideIcon}/>
          <TextInput style={styles.input}/>
          </View>
          <Text style={{textAlign:"center"}}>By continuing you agree with our {"\n"}Terms and Condotions</Text>
          <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('login')}>
             <Text style={{color:"#fff",fontSize:16}}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.signTxt} onPress={()=>navigation.navigate('login')}>Have an account? Sign in </Text>
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
     height:"15%",
     display: "flex",
     flexDirection:"column",
     gap:"0.3%",
     alignItems:"center",
   },
   logoText:{
     textAlign:'center',
     width:"95%",
     color: "#6E6D7A",
   },
   formContainer:{
     width:"100%",
     height:"85%",
     display:"flex",
     flexDirection:"column",
     alignItems:"center",
     justifyContent:"space-evenly"
   },
   inputGroup:{
    backgroundColor:"#ECECEC",
    width:"85%",
    height:"10%",
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
    width:"80%",
    height:"10%",
    backgroundColor:"#1C3530",
    borderRadius:5,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
   },
   input:{
    width:"90%",
    height:"90%",
    borderRadius:10
   }

});


export default RegistrationScreen;
