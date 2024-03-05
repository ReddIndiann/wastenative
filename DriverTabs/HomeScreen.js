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
    
    const handleMarkerPress = (request) => {
        setDestination({ latitude: parseFloat(request.lat), longitude: parseFloat(request.long) });
        // navigation.navigate('InfoScreen', {
        //     author: request.author,
        //     time: request.updatedAt,
        //     type: request.type,
        //     requestId: request._id
        // });
        console.log(request);
    };

    const closeModal = () =>{
        setModalVisible(false);
    }

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
  

    const getRequests = () => {
        axios.post('http://172.20.10.9:5000/api/drivers/assignHauls', {DriverName})
            .then(response => {
                setRequest(response.data);
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

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
    }
})