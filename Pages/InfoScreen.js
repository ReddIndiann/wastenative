import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const InfoScreen = ({ route, navigation }) => {
    const {completeRequest} = useContext(AuthContext);
    const { author, time, type, requestId } = route.params;
    const setCompleted = () => {
        console.log(requestId);
        completeRequest(requestId);
        console.log("completed");
     }

    return (
        <View style={styles.container}>
            <Text>Username: {author}</Text>
            <Text>Type: {type}</Text>
            <Text>Updated At: {time}</Text>
            <Text>Request ID: {requestId}</Text>
            <Button title="Back to Map" onPress={() => navigation.goBack()} />
            <TouchableOpacity style={styles.completedBtn} onPress={()=>setCompleted()}>
                <Text>Completed</Text>
            </TouchableOpacity>
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
        backgroundColor:'dodgerblue',
        borderRadius:5,
        marginTop:20,
        width:"50%",
        height:"8%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
});

export default InfoScreen;
