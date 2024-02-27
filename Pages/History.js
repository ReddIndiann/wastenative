import { StyleSheet, Text, View ,Image,SafeAreaView, TouchableOpacity, Pressable,FlatList} from 'react-native'
import {useContext}from 'react'
import { AuthContext } from '../context/AuthContext';
import { Avatar } from "@react-native-material/core";
import {useNavigation} from '@react-navigation/native';

export default function History() {
  const {userRequests} = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const username = userInfo ? userInfo.username : 'DefaultUser';

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: 'white', display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
      <Text> {item.type}</Text>
      <Text> {new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text> {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex:1,alignItems:"center",backgroundColor:"#F4F6F6"}}>
      <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle} />
          <Pressable onPress={()=>navigation.navigate('UserInfo')}>
           <Avatar label={username} size={45} style={{ marginRight: "3%", }} />
          </Pressable>
      </View>

      <View style={{backgroundColor:'#E1EAE9',height:"17%",width:'90%',marginTop:"1%",borderRadius:5,display:'flex',flexDirection:'row',justifyContent:"space-between",alignItems:"center"}}>
        <View style={{height:"99%",width:"55%",display:"flex",flexDirection:"column",alignItems:"flex-start",padding:8}}>
          <Text style={{ fontSize:17}}>Welcome back,</Text>
          <Text style={{fontSize:18,fontWeight:600,marginTop:"3%"}}>{username}</Text>
          <Text style={{fontSize:12,marginTop:"13%",opacity:10}}>Excited to see you</Text>
        </View>
        <View style={{height:"99%",width:"45%",display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={{backgroundColor:"#1c3530",height:"40%",width:"90%",marginBottom:"5%",marginRight:"5%",borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"white"}}>Make Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{width:"95%",height:"60%",backgroundColor:"white",marginTop:"3%",display:"flex"}}>
        <View style={{height:"10%",width:"90%",paddingLeft:"7%",display:"flex",flexDirection:"row",paddingRight:"5%",justifyContent:"space-between",alignItems:"center"}}>
          <Text style={{fontSize:17,fontWeight:600}}>Haul History</Text>
          <Text>All</Text>
        </View>
        <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between",alignItems:'center',backgroundColor:"white",paddingLeft:"7%",paddingRight:"15%"}}>
           <Text>Haul Type</Text>
           <Text>Time</Text>
           <Text>Status</Text>
        </View>
        <FlatList
          data={userRequests}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
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