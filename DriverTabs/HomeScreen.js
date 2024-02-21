import { StyleSheet, Text, View ,Platform, PermissionsAndroid} from 'react-native'
import {useState,useEffect} from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function HomeScreen() {
    const [region, setRegion] = useState(null);

    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation();
                }
            });
        } else {
            // For iOS, request permission in Info.plist
            getCurrentLocation();
        }
    }, []);
    
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const currentRegion = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                setRegion(currentRegion);
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };  

    const handleMapPress = (e) => {
        setCoordinate(e.nativeEvent.coordinate); // Store the coordinate object directly
        console.log(e.nativeEvent.coordinate);
    }

  return (
    <View style={{flex:1}}>
        {region && (
      <MapView onPress={handleMapPress} zoo initialRegion={region}  provider={PROVIDER_GOOGLE} showsUserLocation={true} followsUserLocation={true}  style={styles.map}>
        
      </MapView>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    map:{
        flex:1
    }
})