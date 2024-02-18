import { View, Text, SafeAreaView,StyleSheet,Image, TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Avatar } from "@react-native-material/core";
import axios from 'axios';

export default function HomeScreen() {
  const username = "Emmanuel Nyatepe";    
  const userId = "6734yug347643b3834gf65";
  const [coordinate, setCoordinate] = useState(null);
  const number = "0567395234"; 
  const [type,setType]=useState("Plastic");



  const [region, setRegion] = useState({
    latitude: 5.614818,
    longitude: -0.205874,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMapPress = (e) => {
    setCoordinate(e.nativeEvent.coordinate); // Store the coordinate object directly
    console.log(e.nativeEvent.coordinate);
  }

  const sendLocationData = () => {
    if (!coordinate) {
      console.log('No location selected');
      return;
    }
    const data = {
      username,
      userId,
      number,
      type,
      lat: coordinate.latitude,
      long: coordinate.longitude,
    };

    axios.post('http://191.168.2.230:5000/api/request', data)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

  return (
    <SafeAreaView  style={styles.home}>
      <MapView onPress={handleMapPress} initialRegion={region}  style={styles.map}> 
      {coordinate && <Marker coordinate={coordinate} />}
      </MapView>
      <View style={styles.float}>
        <View style={styles.logoContainer}>
          <Image source={require('../Images/EcoHaul.png')} style={styles.imageStyle}/>
          <Avatar label={username} size={45} style={{marginRight:"3%",}}/>
        </View>
        <TextInput style={styles.input}/>
        <View style={styles.requestContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.txt1}>Put in a Haul Request</Text>
            <Text style={styles.txt2}>Select a location on the map for waste pickup</Text>
          </View>
          <TouchableOpacity onPress={sendLocationData} style={styles.requestBtn}>
            <Text style={{color:"#fff"}}>Make Request</Text>
          </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    home:{
      flex:1,
    },
    map:{
      flex:1
    },
    float:{
      position:"absolute",
      width:"95%",
      height:"25%",
      backgroundColor:"#eeeee4",
      alignSelf:"center",
      top:"5%",
      borderRadius:10,
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
    },
    logoContainer:{
      width:"100%",
      height:"30%",
      display: "flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
    },
    imageStyle:{
      width:"40%",
      height:"70%",
      resizeMode:"contain",
      marginLeft:"30%"
    },
    input:{
      width:"80%",
      height:"25%",
      borderRadius:10,
      backgroundColor:"#fff"
    },
    requestContainer:{
      width:"95%",
      height:"40%",
      marginTop:"1%",
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
    },
    textContainer:{
      width:"60%",
      height:"70%",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-around",
    },
    requestBtn:{
      width:"35%",
      height:"60%",
      backgroundColor:"#179A72",
      borderRadius:4,
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      marginRight:"2%",
      color:"#fff"
    },
    txt1:{
      color:"black",
      fontSize:19,
      fontWeight:"600"
    },
    txt2:{
      color:"black",
      fontSize:9,
      fontWeight:"400",
      opacity:0.5
    }
})