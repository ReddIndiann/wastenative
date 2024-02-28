import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity,Image, Pressable } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const InfoScreen = ({ route, navigation }) => {
    const {completeRequest ,comAssociate} = useContext(AuthContext);
    const { author, time, type, requestId } = route.params;
    
    const setCompleted = () => {
        console.log(requestId);
        completeRequest(requestId,comAssociate);
        console.log("completed");
     }

    return (
        <View style={styles.container}>
            <Image source={require('../Images/EcoHaul.png')} style={{marginTop:"15%"}}/>
            <Text style={{ color:"#6e6d7a" }}>View Selected Haul Details</Text>
            <View style={{marginTop:"4%",width:"92%",height:"35%",backgroundColor:"#e1eae9",display:"flex",flexDirection:"column"}}>
              <Text style={{textAlign:"center",marginTop:"4%"}}>Haul Details</Text>
              <Text style={{marginTop:"8%",fontWeight:500,marginLeft:"5%"}}>Username: {author}</Text>
              <Text style={{fontWeight:500,marginLeft:"5%",marginTop:"4%"}}>Waste Type: {type}</Text>
              <Text style={{fontWeight:500,marginLeft:"5%",marginTop:"4%"}}>Updated At: {time}</Text>
              <Text style={{fontWeight:500,marginLeft:"5%",marginTop:"4%"}}>Request ID: {requestId}</Text>
            </View>
            <Pressable onPress={()=>navigation.navigate('Home')} >
                <Text style={{marginTop:"5%",fontWeight:500}}>
                    Go Back to Map
                </Text>
            </Pressable>

            <TouchableOpacity style={styles.completedBtn} onPress={()=>setCompleted()}>
                <Text style={{color:"white",fontSize:15}}>Completed</Text>
            </TouchableOpacity>
            {/*<Text>Username: {author}</Text>
            <Text>Type: {type}</Text>
            <Text>Updated At: {time}</Text>
            <Text>Request ID: {requestId}</Text>
            <Button title="Back to Map" onPress={() => navigation.goBack()} />
            */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    completedBtn:{
        backgroundColor:'#1C3530',
        borderRadius:5,
        marginTop:20,
        width:"70%",
        height:"8%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
});

export default InfoScreen;
