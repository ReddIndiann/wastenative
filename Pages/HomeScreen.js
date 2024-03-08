import { View, Text, SafeAreaView, StyleSheet, Image,FlatList, TextInput, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState, useContext, useRef } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location'
import axios from 'axios';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { CheckCircleIcon } from 'react-native-heroicons/solid';
import RNPickerSelect from "react-native-picker-select";


import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
  const { userInfo } = useContext(AuthContext);
  const username = userInfo ? userInfo.username : 'DefaultUser';
  const author = userInfo?.email;
  const [coordinate, setCoordinate] = useState(null);
  const [type, setType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [cityInfo,setCityInfo] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // New state for live location
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [isCustomModalVisible, setIsCustomModalVisible] = useState(true);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const frequentLocations = [
  
    
  ];
  
  const CustomModal = ({ visible, onClose,frequentLocations }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'space-between', // Aligns the modal view to the bottom
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
        flexDirection: "column",
      }}>
        <View style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          
          width: "100%", // Takes 100% width of the screen
          height: "100%", // Takes 50% height from the bottom
         
        }}>
           <TouchableOpacity style={styles.customModalCloseButton} onPress={onClose}>
            <XMarkIcon color="#000" size={24} />
          </TouchableOpacity>

           <View style={{ fontSize: 20, marginBottom: 60,marginTop:10 }}>
           <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
  placeholder='Search for location'
  onFocus={() => setIsSearchActive(true)}
  onBlur={() => setIsSearchActive(false)}
  fetchDetails={true}
  style={styles.inputt}
  GooglePlacesSearchQuery={{
    rankby: 'distance'
  }}
  onPress={(data, details = null) => {
    // 'details' is provided when fetchDetails = true
    console.log(data, details);
    setIsSearchActive(false)
    setIsCustomModalVisible(false);
    setRegion({
      ...region,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  }}
  query={{
    key: 'AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4',
    language: 'en',
    types: 'geocode', // or 'establishment', 'regions', etc.
  }}
 
  
/>


</View>
           </View>
         
      
              
                <TouchableOpacity 
                    style={styles.locationOption}
                    onPress={handleUseCurrentLocation}>
                    <Text style={styles.locationOptionText}>Use Current Location</Text>
                </TouchableOpacity>
                {
  !isSearchActive && (
                <FlatList
  data={frequentLocations}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity 
      style={styles.locationOption}
      onPress={() => {/* Handle the press event */}}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: '#000',
          marginRight: 10,
        }} />
        <Text style={styles.locationOptionText}>{item.name}</Text>
      </View>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  )}
/>
  )
}
                
            </View>
      </View>
    </Modal>
  );
  // Toggle both CustomModal and Se
  const closeCustomModal = () => setIsModalVisible(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  
  useEffect(() => {
    if (location) {
      (async () => {
        let geocode = await Location.reverseGeocodeAsync(location.coords);
        console.log(geocode);
      })();
    }
  }, [location]);
  
  const toggleCustomModal = () => {
    setIsCustomModalVisible(!isCustomModalVisible);
  };

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

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setCoordinate(currentLocation);
      setIsCustomModalVisible(false); // Close CustomModal
      // Update the region and animate the map to the new region
      const newRegion = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922, // Adjust as necessary
        longitudeDelta: 0.04201, // Adjust as necessary
      };
      setRegion(newRegion);
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000); // Animate with a duration of 1000ms
      }
    } else {
      console.error('Current location is not available');
      // Handle the error appropriately
    }
  };
  
  const handleMapPress = (e) => {
    setCoordinate(e.nativeEvent.coordinate); // Store the coordinate object directly
    console.log(e.nativeEvent.coordinate);
  }
  const setLoc = (e) => {
    if (!coordinate) {
      console.log('No location selected');
      setIsModalVisible(false); // Hides any other modal
      setIsCustomModalVisible(true); // Shows the CustomModal
      // Shows the SecondCustomModal
      return;
    } else {
      console.log('Location selected');
      setIsModalVisible(true); // Shows a different modal if a location is selected
    }
  };


  const sendLocationData = () => {
    if (!coordinate) {
      console.error('No location selected');
      return;
    }
  
    const data = {
      type,
      lat: coordinate.latitude,
      long: coordinate.longitude,
      author
    };
  
    axios.post('http://190.168.0.134:5000/api/request', data)
      .then(response => {
        if (response.status === 200) {
          setCoordinate(null);
          setType(''); // Reset the type
          setIsModalVisible(false); // Close the waste type modal
          setIsSuccessModalVisible(true); // Show success modal
          setTimeout(() => {
            setIsSuccessModalVisible(false);
          }, 2000);
        } else {
          console.error('Error:', response);
          setIsErrorModalVisible(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setIsErrorModalVisible(true);
      });
  };

  const onPlaceSelected = (data, details = null) => {
    if (details) {
      const newCoordinate = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };
      const newRegion = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.0922,  // You can adjust these deltas as needed
        longitudeDelta: 0.0421,
      };

      setCoordinate(newCoordinate);
      setRegion(newRegion)
      
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);  // 1000 is the duration in ms
      }
    }
  };
  return (
    <View style={styles.home}>
      <MapView
        ref={mapRef}
        onPress={handleMapPress}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}

        region={region}  // Use 'region' instead of 'initialRegion' to allow dynamic changes
        style={styles.map}>
        {coordinate && (
          <Marker
            coordinate={coordinate}
            title={"Selected Location"}
            description={"This is your selected location for waste pickup"}
          />
        )}
      </MapView>
      {/*       
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
    console.log(data, details);
    setCoordinate({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    });
    setRegion({
      ...region,
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  }}
  query={{
    key: 'AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4',
    language: 'en',
    types: 'geocode', // or 'establishment', 'regions', etc.
  }}
 
  
/>


</View> */}


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
          <TouchableOpacity style={styles.closeButtonn} onPress={closeModal}>
            <XMarkIcon color="#009065" size={20} style={styles.closeButtonText} />
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
          <Text style={{ color: "#009065", fontSize: 13, fontWeight: 500, marginTop: "2%" }}>Click To Use</Text>
        </View>
      </Modal>

      <CustomModal visible={isCustomModalVisible} onClose={toggleCustomModal} frequentLocations={frequentLocations} />


      <Modal
        animationType="slide"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={closeSuccessModal}>
        <View style={styles.SuccessmodalView}>
          {/* Modal content */}
          <CheckCircleIcon size={60} color="#4ECCA3" />
          <Text style={{ fontSize: 20, width: "80%", textAlign: "center" }}>Response{"\n"}Submitted</Text>
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
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    zIndex: 10,
    
  },
  inputt: {
    borderColor: "#888",
    borderWidth: 1,
    margin: 30
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
    borderRadius: 8,
  },
  customModalCloseButton: {
    marginLeft: 300,
    marginTop: 30,
   
  },
  sendBtn: {
    width: "83%",
    height: "17%",
    backgroundColor: "#009065",
    marginTop: "5%",
    borderRadius: 5,
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
    padding: 10,
    top: "7%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 5
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
  locationOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
},
locationOptionText: {
    fontSize: 18,
},
closeButton: {
    backgroundColor: "#009065",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
},
closeButtonn: {
 
  padding: 10,
  marginTop: 20,
  marginLeft: 20,
  borderRadius: 5,

},
closeButtonText: {
    color: "#fff",
    fontSize: 16,
}
,
locationOption: {
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
  backgroundColor: 'white',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: 10, // Adjust for rounded corners
  marginTop: 10, // Add space between items
  shadowColor: "#000", // These lines add a shadow effect
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  elevation: 5,
},

locationOptionText: {
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 10, // Add space between the icon and the text
},

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
  }
});