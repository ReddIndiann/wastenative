import { StyleSheet, Text, View } from 'react-native'
import {useContext}from 'react'
import { AuthContext } from '../context/AuthContext';

export default function History() {
  const {userRequests} = useContext(AuthContext);
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <View style={{width:"95%",height:"50%",backgroundColor:"dodgerblue"}}>
      {userRequests.map((request, index) => (
                    <View key={index} style={{margin: 10, padding: 10, backgroundColor: 'white'}}>
                        <Text>Type: {request.type}</Text>
                        <Text>Date: {new Date(request.createdAt).toLocaleDateString()}</Text>
                        <Text>Status: {request.status}</Text>
                    </View>
                ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})