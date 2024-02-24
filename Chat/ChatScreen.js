import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {useEffect} from 'react'
import {useNavigation} from '@react-navigation/stack'

export default function ChatScreen() {

  const navigation = useNavigation()

  return (
    <SafeAreaView style={{flex:1,alignItems:"center"}}>
       <TouchableOpacity style={{backgroundColor:"dodgerblue",width:"30%",height:"30%"}} onPress={()=>navigation.navigate('CompanyList')}>
         
       </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})