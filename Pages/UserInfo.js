import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {useContext}from 'react'
import { AuthContext } from '../context/AuthContext';
import { Avatar } from "@react-native-material/core";
export default function UserInfo() {
  const {logout,userInfo} = useContext(AuthContext);
  const username = userInfo.username
  const email = userInfo.email
  const phone = userInfo.phone
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center"}}>
      <Image source={require('../Images/EcoHaul.png')} style={{marginTop:"15%"}}/>
      <Text style={{ color:"#6e6d7a" }}>User's Profile View</Text>
      <View style={{backgroundColor:"#e1eae9",width:"92%",height:'40%',marginTop:"5%",borderRadius:10,display:"flex",flexDirection:"column"}}>
        <Avatar color='#1c3530' round label={username} style={{marginLeft:"4%",marginTop:"5%",backgroundColor:"#1c3530"}} />
        <Text style={{fontWeight:700,marginLeft:"5%",marginTop:"2%",fontSize:20}}>{username}</Text>
        <Text style={{marginTop:"1%",marginLeft:"5%"}}>Email:</Text>
        <Text style={{fontWeight:700,marginLeft:"5%",marginTop:"2%"}}>{email}</Text>
        <Text style={{marginTop:"1%",marginLeft:"5%"}}>Phone:</Text>
        <Text style={{fontWeight:700,marginLeft:"5%",marginTop:"2%"}}>{phone}</Text>
      </View>
      <Text style={{marginTop:"10%"}}>To log out click the button below</Text>
      <TouchableOpacity style={{backgroundColor:"black",height:"8%",width:"50%",marginTop:"5%",justifyContent:"center",alignItems:"center",borderRadius:5}} onPress={()=>logout()}>
        <Text style={{color:"white",textAlign:"center",fontSize:15}}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})