import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const CustomModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={{ 
      flex: 1, 
      justifyContent: 'space-between', // Aligns the modal view to the bottom
      backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
      flexDirection:"column",
    }}>
      <View style={{ 
        backgroundColor: 'white', 
        padding: 20,
        borderRadius: 10,
        width: "100%", // Takes 100% width of the screen
        height: "10%", // Takes 50% height from the bottom
        marginTop:"10%"
      }}>
        <Text>Hello from Modal!</Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </View>
      <View style={{ 
        backgroundColor: 'white', 
        padding: 20,
        borderRadius: 10,
        width: "100%", // Takes 100% width of the screen
        height: "50%", // Takes 50% height from the bottom
      }}>
        <Text>Hello from Modal!</Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default  CustomModal;