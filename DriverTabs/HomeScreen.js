import { StyleSheet, Text, View ,Modal,TouchableOpacity} from 'react-native'
import {useState,useEffect,useContext} from 'react'
import MapView, { PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { AuthContext } from '../context/AuthContext';
import { XMarkIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import * as Location from 'expo-location';

export default function HomeScreen() {
    const {completerequest} = useContext(AuthContext);
    const [requests,setRequest]= useState([]);
    const [destination, setDestination] = useState();
    const [currentLocation, setCurrentLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 5.614818,
        longitude: -0.205874,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMarkerData, setSelectedMarkerData] = useState({});
    
    const handleMarkerPress = (request) => {
        setSelectedMarkerData({ author: request.author, time: request.updatedAt, Type:request.type, requestId: request._id}); // Assuming these fields are available in your request data
        setModalVisible(true);
    };

    const closeModal = () =>{
        setModalVisible(false);
    }

    useEffect(() => {
        getRequests();
        getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    };

    const getRequests = () => {
        axios.get('http://172.20.10.5:5000/api/request/allrequests')
            .then(response => {
                setRequest(response.data);
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

    const setCompleted = () => {
       completerequest(selectedMarkerData.requestId);
       console.log(selectedMarkerData.requestId)
       console.log("completed");
       closeModal();
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
                        coordinate={{
                            latitude: parseFloat(request.lat),
                            longitude: parseFloat(request.long)
                        }}
                        onPress={() => handleMarkerPress(request)}
                    />
                ))}
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