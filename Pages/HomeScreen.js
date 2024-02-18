import { View, Text, SafeAreaView,StyleSheet,Image, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import Avatar from '../components/Avatar';
export default function HomeScreen() {
  return (
    <SafeAreaView  style={styles.home}>
      <MapView style={styles.map}></MapView>
      <View style={styles.float}>
        <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle}/>
          <Avatar/>
        </View>
        <TextInput style={styles.input}/>
  
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    home:{
      flex:1,
    },
    map:{
      flex:1
    },
    float:{
      position:"absolute",
      width:"95%",
      height:"25%",
      backgroundColor:"#F4F6F6",
      alignSelf:"center",
      top:"5%",
      borderRadius:10,
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
    },
    logoContainer:{
      width:"100%",
      height:"30%",
      display: "flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
    },
    imageStyle:{
      width:"40%",
      height:"70%",
      resizeMode:"contain",
      marginLeft:"30%"
    },
    input:{
      width:"80%",
      height:"25%",
      borderRadius:10,
      backgroundColor:"dodgerblue"
    }
})