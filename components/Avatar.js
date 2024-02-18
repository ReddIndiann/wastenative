import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Avatar() {
  return (
    <View style={styles.avatar}>
      <Text style={{textAlign:"center",fontSize:25,fontWeight:700}}>EN</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    avatar:{
        width:"12%",
        height:"90%",
        borderRadius:90,
        backgroundColor:"red",
        borderWidth:1,
        borderColor:"#179A72",
        marginRight:"2%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
})