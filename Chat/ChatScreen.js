import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ChatScreen() {
  return (
    <View style={{flex:1,alignItems:"center"}}>
       <ScrollView horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"dodgerblue" ,
        width:"90%"
      }}
      >

       </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})