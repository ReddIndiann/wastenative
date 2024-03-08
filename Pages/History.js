import { StyleSheet, Text, View ,Image,SafeAreaView, TouchableOpacity, Pressable,FlatList} from 'react-native'
import {useContext}from 'react'
import { AuthContext } from '../context/AuthContext';
import { Avatar } from "@react-native-material/core";
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useEffect,useState } from 'react';
export default function History() {

  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const username = userInfo ? userInfo.username : 'DefaultUser';
const email =userInfo.email
const [userRequests,setUserRequests]= useState([])
useEffect(()=>{
  fetchUserRequests(email)

},[email])




const fetchUserRequests = (email) => {
  axios.get(`http://190.168.1.112:5000/api/request/userhistory?author=${email}`)
      .then(res => {
          // Handle the response containing the requests
          console.log("User requests:", res.data);
          setUserRequests(res.data);
      })
      .catch(error => {
          console.error("Error fetching user requests", error);
      });
      
}
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemText}>{item.type}</Text>
        <Text style={styles.listItemText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.listItemText}>{item.status}</Text>
      </View>
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

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Haul History</Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F6F6',
  },
  listContainer: {
    width: '95%',
    marginTop: '3%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  listItem: {
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})