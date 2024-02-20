import { StyleSheet, Text, View ,Image,SafeAreaView} from 'react-native'
import {useContext}from 'react'
import { AuthContext } from '../context/AuthContext';
import { Avatar } from "@react-native-material/core";

export default function History() {
  const {userRequests} = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const username = userInfo ? userInfo.username : 'DefaultUser';
  return (
    <SafeAreaView style={{flex:1,alignItems:"center",backgroundColor:"#F4F6F6"}}>
      <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle} />
          <Avatar label={username} size={45} style={{ marginRight: "3%", }} />
        </View>
      <View style={{width:"95%",height:"50%",backgroundColor:"dodgerblue"}}>
      {userRequests.map((request, index) => (
                    <View key={index} style={{margin: 10, padding: 10, backgroundColor: 'white'}}>
                        <Text>Type: {request.type}</Text>
                        <Text>Date: {new Date(request.createdAt).toLocaleDateString()}</Text>
                        <Text>Status: {request.status}</Text>
                    </View>
                ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop:"1%"
  },
  imageStyle: {
    width: "40%",
    height: "70%",
    resizeMode: "contain",
    marginLeft: "30%"
  },
})