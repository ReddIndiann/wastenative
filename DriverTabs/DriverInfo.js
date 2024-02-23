import { StyleSheet, Text, View,SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import {useContext,useState} from 'react'
import { AuthContext } from '../context/AuthContext';
import { Avatar } from '@react-native-material/core';

export default function DriverInfo() {
  const {logout,userInfo}=useContext(AuthContext);
  const username = userInfo?.username;
  return (
    <SafeAreaView style={styles.app}>
      <Avatar size={150} name={username} round />
      <Text>{username}</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={()=>logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
 app:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
 },
 logoutBtn:{
   backgroundColor:'dodgerblue',
   borderRadius:5,
   marginTop:20,
   width:"50%",
   height:"8%"
 }
})