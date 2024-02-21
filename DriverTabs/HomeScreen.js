import { StyleSheet, Text, View } from 'react-native'
import {useState,useEffect} from 'react'
import MapView, { PROVIDER_GOOGLE,Marker,Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';

export default function HomeScreen() {
    const [requests,setRequest]= useState([]);
    const [destination, setDestination] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 5.614818,
        longitude: -0.205874,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    
    const handleMarkerPress = (request) => {
        setDestination({ latitude: parseFloat(request.lat), longitude: parseFloat(request.long) });
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    }

    useEffect(() => {
        getRequests();
    }, []);

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

  return (
    <View style={{ flex: 1 }}>
            <MapView 
                onPress={handleMapPress} 
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

                {currentLocation && destination && (
                    <Polyline
                        coordinates={[currentLocation, destination]}
                        strokeColor="#000" // polyline color
                        strokeWidth={3}
                    />
                )}
                
            </MapView>
        </View>
  )
}

const styles = StyleSheet.create({
    map:{
        flex:1
    }
})