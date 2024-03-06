import { StyleSheet, Text, View ,Modal,TouchableOpacity} from 'react-native'
import {useState,useEffect,useContext} from 'react'
import MapView, { PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { AuthContext } from '../context/AuthContext';
import { XMarkIcon } from 'react-native-heroicons/outline';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

export default function HomeScreen() {
    const [requests,setRequest]= useState([]);
    const [destination, setDestination] = useState();
    const [currentLocation, setCurrentLocation] = useState(null);
    const {lat ,long ,userInfo} = useContext(AuthContext);
    const [location, setLocation] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const DriverName = userInfo.username;
    
    const [region, setRegion] = useState({
        latitude: 5.614818,
        longitude: -0.205874,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMarkerData, setSelectedMarkerData] = useState({});

    const navigation = useNavigation();
    
    // const handleMarkerPress = (request) => {
    //     setDestination({ latitude: parseFloat(request.lat), longitude: parseFloat(request.long) });
    //     // navigation.navigate('InfoScreen', {
    //     //     author: request.author,
    //     //     time: request.updatedAt,
    //     //     type: request.type,
    //     //     requestId: request._id
    //     // });
    //     console.log(request);
    // };
    const handleMarkerPress = (request) => {
        setSelectedRequest(request);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        getRequests();
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
        })();
    }, []);
  
    const showDirections = () => {
        if (selectedRequest && currentLocation) {
            setDestination({
                latitude: parseFloat(selectedRequest.lat),
                longitude: parseFloat(selectedRequest.long)
            });
            setIsModalVisible(false); // Close the modal when showing directions
        }
    };

    const getRequests = () => {
        axios.post('http://191.168.7.48:5000/api/drivers/assignHauls', {DriverName})
            .then(response => {
                setRequest(response.data);
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

    const showDetails = () => {
        setIsModalVisible(false); // Close the modal
        navigation.navigate('InfoScreen', {
          author: selectedRequest.author,
          time: selectedRequest.updatedAt,
          type: selectedRequest.type,
          requestId: selectedRequest._id
        });
      };
  return (
    <View style={{ flex: 1 }}>
            <MapView 
                initialRegion={region} 
                provider={PROVIDER_GOOGLE} 
                showsUserLocation={true} 
                followsUserLocation={true} 
                style={styles.map}
            >
                {requests.map(request => (
                    <Marker
                        key={request._id}
                        coordinate={{ latitude: parseFloat(request.lat), longitude: parseFloat(request.long) }}
                        onPress={() => handleMarkerPress(request)}
                    />
                ))}

{currentLocation && destination && (
                    <MapViewDirections
                        origin={currentLocation}
                        destination={destination}
                        apikey={'AIzaSyB_oFQ3l8sdvksjPmf-q5lK75YPv0N2Kp4'} // Replace with your Google Maps API Key
                        strokeWidth={4}
                        strokeColor="blue"
                    />
                )}
            </MapView>
            <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <XMarkIcon color="white" size={20} style={styles.closeButtonText} />
          </TouchableOpacity>
          
          <View style={styles.inputGroup}>

            <TouchableOpacity onPress={showDirections}>
        <Text style={{ color: "#009065", fontSize: 15, fontWeight: 400 }}>Show Drections  </Text>
      </TouchableOpacity>

      
          </View>
          <TouchableOpacity onPress={showDetails}>
        <Text style={{ color: "#009065", fontSize: 15, fontWeight: 400 }}>Show Distance </Text>
      </TouchableOpacity>

        </View>
      </Modal>
        </View>
  )
}

const styles = StyleSheet.create({
    map:{
        flex:1
    },
    modalView: {
        backgroundColor: "dodgerblue",
        width:"70%",
        height:"30%",
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
        marginTop:"60%",
        marginLeft:'15%'
    },
    buttonClose: {
        backgroundColor: "red",
        width:"15%",
        height:"15%",
        marginTop:"2%",
        marginLeft:"80%",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalView: {
      margin: 20,
      width: "90%",
      height: "40%",
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