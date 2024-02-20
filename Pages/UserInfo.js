import { StyleSheet, Text, View,SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function UserInfo() {
  const {logout} = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"dodgerblue"}}>
      <TouchableOpacity style={{backgroundColor:"black",height:"10%",width:"60%"}} onPress={()=>logout()}>
        <Text style={{color:"white",textAlign:"center",marginTop:"5%"}}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})