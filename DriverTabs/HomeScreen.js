import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function HomeScreen() {
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

  return (
    <View style={{flex:1}}>
      <MapView onPress={handleMapPress} zoo initialRegion={region}  provider={PROVIDER_GOOGLE} showsUserLocation={true} followsUserLocation={true}  style={styles.map}>
        
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
    map:{
        flex:1
    }
})