import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
export default function HomeScreen() {
  return (
    <SafeAreaView  style={styles.home}>
      <MapView style={styles.map}></MapView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    home:{
      flex:1,
    },
    map:{
      flex:1
    }
})