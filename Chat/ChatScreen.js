import { ScrollView, StyleSheet, Text, TouchableOpacity, View,SafeAreaView } from 'react-native'
import {useEffect} from 'react'


export default function ChatScreen() {



  return (
    <SafeAreaView style={{flex:1,alignItems:"center"}}>
       <TouchableOpacity style={{backgroundColor:"dodgerblue",width:"30%",height:"30%"}} onPress={()=>navigation.navigate('CompanyList')}>
         
       </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})