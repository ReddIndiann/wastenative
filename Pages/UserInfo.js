import { StyleSheet, Text,ScrollView, View,SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {useContext}from 'react'
import { AuthContext } from '../context/AuthContext';
import { Avatar } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SettingOption = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Icon name={iconName} size={24} color="#000" />
    <Text style={styles.optionText}>{title}</Text>
  </TouchableOpacity>
);
export default function UserInfo() {
  const {logout,userInfo} = useContext(AuthContext);
  const username = userInfo.username
  const email = userInfo.email
  const phone = userInfo.phone
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Icon name="account-circle" size={150} color="#000" />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.userTitle}>{email}</Text>
        {/* Add other workspace icons and text here if needed */}
      </View>
      <SettingOption title="Do Not Disturb" iconName="bell-off-outline" />
      <SettingOption title="Push Notifications" iconName="bell-outline" />
      {/* Add more settings options here */}
      <SettingOption title="How to use AI" iconName="robot" />
      <SettingOption title="How to use app" iconName="cellphone" />
      <SettingOption title="Contact support" iconName="lifebuoy" />
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);
}const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
},
scrollView: {
  width: '100%',
},
header: {
  alignItems: 'center',
  marginVertical: 30, // Increased vertical margin for more space
},
username: {
  fontSize: 24, // Slightly larger text for username
  fontWeight: 'bold',
  color: '#333', // Lighter black shade
  marginBottom: 4, // Added for spacing between username and title
},
userTitle: {
  fontSize: 18, // Slightly larger text for title
  color: '#666', // Lighter shade for title
},
option: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 20, // Increased padding for more space
  paddingHorizontal: 25, // Increased padding for more space
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
  backgroundColor: '#fafafa', // Slightly off-white background for each option
},
optionText: {
  fontSize: 18, // Slightly larger text for option
  marginLeft: 20, // Increased spacing after icon
  color: '#333', // Lighter black shade
  flex: 1, // Ensure text takes up all available space
},
logoutBtn: {
  backgroundColor: '#179A72',
  borderRadius: 5,
  marginTop: 30, // Increased margin top for more space
  width: "90%", // Slightly wider button
  alignSelf: 'center',
  paddingVertical: 12, // Increased vertical padding for taller button
},
logoutText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 18, // Slightly larger text for button
},
});
