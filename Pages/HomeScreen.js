import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState,useContext,useRef } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import axios from 'axios';
import { XMarkIcon } from 'react-native-heroicons/outline';
import {CheckCircleIcon} from 'react-native-heroicons/solid';
import RNPickerSelect from "react-native-picker-select";
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
  const { userInfo } = useContext(AuthContext);
  const username = userInfo ? userInfo.username : 'DefaultUser';
  const author =  userInfo?.email;
  const [coordinate, setCoordinate] = useState(null);
  const [type, setType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const mapRef = useRef(null);

  const closeModal = () => {
    setIsModalVisible(false); // Hide modal
  };
  const closeSuccessModal = () => setIsSuccessModalVisible(false);
  const closeErrorModal = () => setIsErrorModalVisible(false);


  
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

  const setLoc = (e) => {
    if (!coordinate) {
      console.log('No location selected');
      setIsModalVisible(false)
      return;
    } else {
      console.log('Location selected');
      setIsModalVisible(true)
    }
  }

  const sendLocationData = () => {

    const data = {
      type,
      lat: coordinate.latitude,
      long: coordinate.longitude,
      author
    };

    axios.post('http://172.20.10.5:5000/api/request', data)
      .then(response => {
        if (response.status === 200) {
          setCoordinate(null);
          setIsModalVisible(false);
          setIsSuccessModalVisible(true);
          setTimeout(() => {
            setIsSuccessModalVisible(false);
        }, 2000);

        }else{
          console.error('Error:', error);
      setIsErrorModalVisible(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
  };

  return (
    <View style={styles.home}>
     
     <MapView
  ref={mapRef}
  onPress={handleMapPress}
  provider={PROVIDER_GOOGLE}
  showsUserLocation={true}
  followsUserLocation={true}
  initialRegion={region}
  style={styles.map}
>
  {coordinate && <Marker coordinate={coordinate} />}
</MapView>

      
      <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
  placeholder='Search for location'
  fetchDetails={true}
  style={styles.inputt}
  GooglePlacesSearchQuery={{
    rankby: 'distance'
  }}
  onPress={(data, details = null) => {
    // 'details' is provided when fetchDetails = true
    if (details) {
      const newRegion = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.0922, // or a suitable delta value
        longitudeDelta: 0.0421, // or a suitable delta value
      };
      setRegion(newRegion); // Update region state
      mapRef.current.animateCamera({center: newRegion}, { duration: 1000 }); // Animate camera if you want
    }
  }}
  query={{
    key: 'AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4',
    language: 'en',
    types: 'geocode', // or 'establishment', 'regions', etc.
  }}
/>
</View>

       
        <View style={styles.requestContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.txt1}>Put in a Haul Request</Text>
            <Text style={styles.txt2}>Select a location on the map for waste pickup</Text>
          </View>
          <TouchableOpacity onPress={setLoc} style={styles.requestBtn}>
            <Text style={{ color: "#fff" }}>Make Request</Text>
          </TouchableOpacity>
        </View>
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <XMarkIcon color="white" size={20} style={styles.closeButtonText} />
          </TouchableOpacity>
          <Text style={{ color: "#009065", fontSize: 20, fontWeight: 400 }}>Select Waste Type</Text>
          <Text style={{ color: "#C0C0C0", fontSize: 13, textAlign: "center", marginTop: "3%" }}>Provide the category of waste by selecting{"\n"}from the dropdown</Text>
          <View style={styles.inputGroup}>
            <Text style={{ color: "#009065", fontSize: 15, fontWeight: 400 }}>Waste Type*</Text>
            <RNPickerSelect
              placeholder={{ label: "Select an item...", value: null }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              onValueChange={(type) => setType(type)}
              items={[
                { label: "Plastic", value: "Plastic" },
                { label: "Metal", value: "Metal" },
                { label: "Paper", value: "Paper" },
                { label: "Glass", value: "Glass" },
                { label: "Others", value: "Others" },
              ]}
            />
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={sendLocationData}>
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>Submit Response</Text>
          </TouchableOpacity>
          <Text style={{ color: "#C0C0C0", fontSize: 13, textAlign: "center", marginTop: "5%" }}>Try EcoHaul's AI Waste Segregation tool</Text>
          <Text style={{ color: "#009065", fontSize: 13, fontWeight: 500,marginTop:"2%" }}>Click To Use</Text>
        </View>
      </Modal>

      <Modal
    animationType="slide"
    transparent={true}
    visible={isSuccessModalVisible}
    onRequestClose={closeSuccessModal}>
    <View style={styles.SuccessmodalView}>
      {/* Modal content */}
      <CheckCircleIcon size={60} color="#4ECCA3"/>
      <Text style={{fontSize:20,width:"80%",textAlign:"center"}}>Response{"\n"}Submitted</Text>
      <TouchableOpacity onPress={closeSuccessModal}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>

  {/* Error Modal */}
  <Modal
    animationType="slide"
    transparent={true}
    visible={isErrorModalVisible}
    onRequestClose={closeErrorModal}>
    <View style={styles.SuccessmodalView}>
      {/* Modal content */}
      <Text>Error: Try Again</Text>
      <TouchableOpacity onPress={closeErrorModal}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>


    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  searchContainer:{
    position:'absolute',
    width : "90%",
    marginTop:50,
    marginLeft:20,
   backgroundColor:"white",
   shadowColor:"black",
   shadowOffset:{width:2,height:2},
   shadowOpacity:0.5,
   shadowRadius:4,
   elevation:4,
   padding:1,
  
  },
  inputt:{
borderColor:"#888",
borderWidth:1,
margin:30
  }
,
  SuccessmodalView: {
    width: "50%",
    height: "30%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: "55%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius:8,
  },
  sendBtn: {
    width: "83%",
    height: "17%",
    backgroundColor: "#009065",
    marginTop: "5%",
    borderRadius:5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: {
    width: "85%",
    height: "25%",
    display: "flex",
    flexDirection: "column",
    marginTop: "1%",
    justifyContent: "space-evenly",
  },
  input2: {
    width: "100%",
    height: "65%",
    borderRadius: 4,
    backgroundColor: "#fff",
    color: "black",
    borderColor: "#C0C0C0",
    borderWidth: 5
  },
  map: {
    flex: 1
  },
  
  logoContainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
  },
  imageStyle: {
    width: "40%",
    height: "70%",
    resizeMode: "contain",
    marginLeft: "30%"
  },
  input: {
    width: "80%",
    height: "6%",
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    alignSelf: "center",
    top: "8%",
  },
  requestContainer: {
    width: "95%",
    height: "14%",
    padding:10,
    top: "16%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf:"center",
    position: "absolute",
    backgroundColor:"#fff",
    borderRadius:5
  },
  textContainer: {
    width: "60%",
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  requestBtn: {
    width: "35%",
    height: "60%",
    backgroundColor: "#1c3530",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
    color: "#fff"
  },
  txt1: {
    color: "black",
    fontSize: 19,
    fontWeight: "600"
  },
  txt2: {
    color: "black",
    fontSize: 9,
    fontWeight: "400",
    opacity: 0.5
  },
  modalView: {
    margin: 20,
    width: "90%",
    height: "50%",
    display: "flex",
    alignSelf: "center",
    marginTop: "55%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  closeButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 2,
    alignSelf: "flex-end",
    marginTop: "4%",
    marginRight: "4%",
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});