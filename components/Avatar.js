import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Avatar() {
  return (
    <View style={styles.avatar}>
      
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
        borderColor:"#000",
        marginRight:"2%"
    }
})