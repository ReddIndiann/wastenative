import { View, Text, SafeAreaView,StyleSheet,Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Avatar } from "@react-native-material/core";
export default function HomeScreen() {
  return (
    <SafeAreaView  style={styles.home}>
      <MapView style={styles.map}>
        <Marker/>
      </MapView>
      <View style={styles.float}>
        <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle}/>
          <Avatar label="Emmanuel Nyatepe" size={45} style={{marginRight:"3%",}}/>
        </View>
        <TextInput style={styles.input}/>
        <View style={styles.requestContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.txt1}>Put in a Haul Request</Text>
            <Text style={styles.txt2}>Select a location on the map for waste pickup</Text>
          </View>
          <TouchableOpacity style={styles.requestBtn}>
            <Text style={{color:"#fff"}}>Make Request</Text>
          </TouchableOpacity>
        </View>
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
      backgroundColor:"#eeeee4",
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
      backgroundColor:"#fff"
    },
    requestContainer:{
      width:"95%",
      height:"40%",
      marginTop:"1%",
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
    },
    textContainer:{
      width:"60%",
      height:"70%",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-around",
    },
    requestBtn:{
      width:"35%",
      height:"60%",
      backgroundColor:"#179A72",
      borderRadius:4,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      marginRight:"2%",
      color:"#fff"
    },
    txt1:{
      color:"black",
      fontSize:19,
      fontWeight:"600"
    },
    txt2:{
      color:"black",
      fontSize:9,
      fontWeight:"400",
      opacity:0.5
    }
})