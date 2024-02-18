import React from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon 


const RegistrationScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle}/>
          <Text style={styles.logoText} >Let's get you started. Create an account to start with us</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}></View>
          <View style={styles.inputGroup}></View>
          <View style={styles.inputGroup}></View>
          <View style={styles.inputGroup}></View>
          <View style={styles.inputGroup}></View>
          <Text>By continuing you agree with our \n Terms and Condotions</Text>
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
     alignItems:"center"
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
    width:"82%",
    height:"10%"
   }

});


export default RegistrationScreen;
